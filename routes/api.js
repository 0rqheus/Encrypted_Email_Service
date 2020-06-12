const User = require("../models/user");
const Mail = require("../models/mail");
const Chat = require("../models/chat");
const auth = require("../auth_check");
const fs = require("fs");
require("../cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });
const passportJWT = require("passport-jwt");
const router = require("express").Router();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function (passport) {

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.getById(id)
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, (jwtPayload, cb) => {
        User.getById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
    ));

    router.get("/isLoginFree/:login", async (req, res) => {
        const login = req.params.login;
        const user = await User.getByLogin(login);
        if (!user) res.json(false);
        else res.json(true);
    });

    router.get("/file/:id/:position", (req, res) => {
        const id = req.params.id;
        const position = req.params.position;
    
        Mail.getById(id)
            .then(mail => {
                if(String(mail.ownerId) !== String(req.user._id)) return res.sendStatus(403);
                return res.contentType(mail.files[position].contentType).send(mail.files[position].data);
            })
            .catch(err => res.status(500).send(err.toString()));    
    });

    router.use(passport.authenticate("jwt", { session: false }));

    router.get("/", (req, res) => res.json({}));
    router.get("/me", (req, res) => res.json(req.user));

    router.use("/users", auth.checkAuth);

    router.get("/users/get_pages", (req, res) => { //get amount info
        const search = req.query.search;
        const entitiesPerPage = 4;

        User.getAll()
            .then(users => search
                ? users.filter(user => user.login.toLowerCase().includes(search.toLowerCase()) || user.fullname.toLowerCase().includes(search.toLowerCase()))
                : users)
            .then(users => res.json({ pagesAmount: Math.ceil(users.length / entitiesPerPage), resultsAmount: users.length }))
            .catch(err => res.status(500).json(err));
    });

    router.get("/users/public_key/:login", (req, res) => {
        const login = req.params.login;

        User.getByLogin(login)
            .then( user => user ? res.json({pk: user.publicKey}) : res.json({}))
            .catch(err => res.status(500).json(err));
    });

    router.route("/users")
        .get(auth.checkAdmin, (req, res) => {
            const page = req.query.page || 1;
            const search = req.query.search;
            const entitiesPerPage = 4;

            User.getAll()
                .then(users => search
                    ? users.filter(user => user.login.toLowerCase().includes(search.toLowerCase()) || user.fullname.toLowerCase().includes(search.toLowerCase()))
                    : users)
                .then(users => users.slice((page - 1) * entitiesPerPage, page * entitiesPerPage))
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err));
        });

	router.post("/users/change_role/:id", auth.checkAdmin, async (req, res) => {
	    const id = req.params.id;
	    let user;

	    try {
		    user = await User.getById(id);
	    } catch (err) {
		    return res.status(500).send(err.toString());
	    }

        user.role = user.role ? 0 : 1;
        
	    User.update(id, user)
		.then((user) => res.json(user))
		.catch(err => res.status(500).send(err.toString()));

	});

    router.route("/users/:id")
        .get((req, res) => {
            const id = req.params.id;

            if(req.user.id !== id && req.user.role !== 1) return res.sendStatus(403);

            User.getById(id)
                .then(user => user
                    ? res.json(user)
                    : res.sendStatus(404)
                )
                .catch(err => res.status(500).json(err));
        })
        .put(upload.single("file"), async (req, res) => {
            if(req.user.id !== req.params.id) return res.sendStatus(403);

            const id = req.params.id;
            const description = req.body.description;
            const fullname = req.body.fullname;

            let user;

            try {
                user = await User.getById(id);

                const file = req.file;

                if (file) {
                    try {
                        const result = await cloudinary.uploader.upload(file.path);
                        user.avaUrl = result.secure_url;
                    } catch (err) {
                        return res.status(500).send(err.toString());
                    }
                }

                if(description) user.description = description;
                if(fullname) user.fullname = fullname;

            } catch (err) {
                return res.status(500).json(err);
            }

            User.update(id, user)
                .then(chosenUser => chosenUser
                    ? res.json(chosenUser)
                    : res.sendStatus(404))
                .catch(err => res.status(500).json(err));
        })
        .delete(async (req, res) => {
            const id = req.params.id;

            if(req.user.id !== id) return res.sendStatus(403);

            const mails = await Mail.getSubjectAndIdByLogin(req.user.login, req.user.id);

            mails.forEach(async mail => await Mail.delete(mail.id, req.user.id));

            User.deleteById(id)
                .then(() => res.status(200).json(true))
                .catch(err => res.status(500).json(err));
        });

    ////// Mails
    router.get("/mails/get_pages", (req, res) => { //get amount info
        const search = req.query.search;
        const entitiesPerPage = 4;

        Mail.getSubjectAndIdByLogin(req.user.login, req.user.id)
            .then(mails => search
                ? mails.filter(mail => mail.subject.toLowerCase().includes(search.toLowerCase()))
                : mails)
            .then(mails => res.json({ pagesAmount: Math.ceil(mails.length / entitiesPerPage), resultsAmount: mails.length }))
            .catch(err => res.status(500).json(err));
    });
    
    router.use("/mails", auth.checkAuth);

    router.route("/mails")
        .get((req, res) => {
            const page = req.query.page || 1;
            const search = req.query.search;
            const entitiesPerPage = 4;

            Mail.getSubjectAndIdByLogin(req.user.login, req.user.id)
                .then(mails => search
                    ? mails.filter(mail => mail.subject.toLowerCase().includes(search.toLowerCase()))
                    : mails)
                .then(mails => mails.slice((page - 1) * entitiesPerPage, page * entitiesPerPage))
                .then(mails => res.json(mails))
                .catch(err => res.status(500).json(err));
        })
        .post(upload.array("file"), async (req, res) => {
            const isSender = +req.query.isSender;
            const files = req.files;
            const mail = req.body;
            mail.sender = req.user.login;

            const sender = await User.getByLogin(mail.sender);
            const receiver = await User.getByLogin(mail.receiver);

            if((isSender && !sender) || (!isSender && !receiver)){
                return res.status(400).json({err: "no such user"});
            }

            let images;

            if (files) {
                images = [];
                try {
                    for (let i = 0; i < files.length; i++) {
                        const fileData = fs.readFileSync(files[i].path);
                        images.push({ data: fileData, contentType: files[i].mimetype });
                    }
                } catch (err) {
                    return res.status(500).send(err.toString());
                }
            }
            mail.files = images;

            mail.ownerId = isSender ? sender.id : receiver.id;

            Mail.insert(mail, isSender)
                    .then(mailId => res.json(mailId))
                    .catch(err => res.status(500).json(err));
        });

    router.route("/mails/:id")
        .get((req, res) => {
            const id = req.params.id;

            Mail.getById(id)
                .then(mail => {
                    const login = req.user.login;
                    if (login !== mail.receiver && login !== mail.sender) return res.sendStatus(403);

                    if (!mail) return res.sendStatus(400);

                    res.json(mail);
                })
                .catch(err => res.status(500).json(err));
        })
        .put(async (req, res) => {
            const id = req.params.id;
            const labelName = req.body.labelName;

            const mail = await Mail.getById(id);

            if(labelName === "important"){
                mail.labels.important = !mail.labels.important;
            } else if (labelName === "spam"){
                mail.labels.spam = !mail.labels.spam;
            } else if (labelName === "unread"){
                mail.labels.unread = !mail.labels.unread;
            } else {
                return res.sendStatus(400);
            }

            Mail.update(mail.id, mail)
                .then(updatedMail => res.send(updatedMail))
                .catch(err => res.status(500).json(err));
        })
        .delete(async (req, res) => {
            const id = req.params.id;
            const login = req.user.login;

            try {
                const mail = await Mail.getById(id);

                if (login !== mail.receiver && login !== mail.sender) return res.sendStatus(403);

                await Mail.delete(id, req.user.id);

                res.status(200).redirect("/api/v1/mails");

            } catch (err) {
                res.status(500).send(err.toString());
            }
        });

    ////// Chats
    router.use("/chats", auth.checkAuth);

    router.get("/chats/get_pages", (req, res) => {  //get amount info
        const search = req.query.search;
        const entitiesPerPage = 4;

        Chat.getAllByOwnerId(req.user.id)
            .then(chats => search
                ? chats.filter(chat => {
                    return req.user.login === chat.person1 
                        ? chat.person2.toLowerCase().includes(search.toLowerCase())
                        : chat.person1.toLowerCase().includes(search.toLowerCase());
                })
                : chats)
            .then(chats => res.json({ pagesAmount: Math.ceil(chats.length / entitiesPerPage), resultsAmount: chats.length }))
            .catch(err => res.status(500).json(err));
    });

    router.route("/chats")
        .get((req, res) => {
            const page = req.query.page || 1;
            const search = req.query.search;

            const entitiesPerPage = 4;

            Chat.getAllByOwnerId(req.user.id)
                .then(chats => search
                ? chats.filter(chat => {
                    return req.user.login === chat.person1 
                        ? chat.person2.toLowerCase().includes(search.toLowerCase())
                        : chat.person1.toLowerCase().includes(search.toLowerCase());
                })
                : chats)
                .then(chats => chats.slice((page - 1) * entitiesPerPage, page * entitiesPerPage))
                .then(chats => res.json(chats))
                .catch(err => res.status(500).json(err));
        });


    router.get("/chats/:id/get_pages", async (req, res) => {  //get amount info
        const id = req.params.id;
        const search = req.query.search;
        const entitiesPerPage = 4;
        try {
            const chat = await Chat.getById(id);

            let arr = [];

            if (chat) {
                for (const i in chat.messages) {
                    const mail = await Mail.getById(chat.messages[i]);
                    arr[i] = { id: chat.messages[i], name: mail.subject };
                }

                if (search) {
                    arr = arr.filter(mess => mess.name.toLowerCase().includes(search.toLowerCase()));
                }

                res.json({ pagesAmount: Math.ceil(arr.length / entitiesPerPage), resultsAmount: arr.length });
            } else {
                res.sendStatus(404);
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });


    router.route("/chats/:id")
        .get(async (req, res) => {
            const id = req.params.id;
            const page = req.query.page || 1;
            const search = req.query.search;

            const entitiesPerPage = 4;

            try {
                const chat = await Chat.getById(id);
                let arr = [];
                if (chat) {
                    for (const i in chat.messages) {
                        const mail = await Mail.getById(chat.messages[i]);
                        arr[i] = { id: chat.messages[i], name: mail.subject, labels: mail.labels };
                    }

                    if (search) {
                        arr = arr.filter(mess => mess.name.toLowerCase().includes(search.toLowerCase()));
                    }

                    arr = arr.slice((page - 1) * entitiesPerPage, page * entitiesPerPage);

                    chat.messages = [];

                    for (const i in arr) {
                        chat.messages[i] = arr[i];
                    }

                    res.json(chat);
                } else {
                    res.sendStatus(404);
                }
            } catch (err) {
                res.sendStatus(500).json(err);
            }
        })
        .delete(async (req, res) => {
            const id = req.params.id;

            try {
                const chat = await Chat.getById(id);

                if(req.user.id !== chat.ownerId) return res.sendStatus(403);

                if (chat) {
                    for (const i in chat.messages) {
                        await Mail.delete(chat.messages[i], req.user.id);
                    }
                }

                res.redirect("/api/v1/chats");
            } catch (err) {
                return res.status(500).json(err);
            }
        });

    return router;
};