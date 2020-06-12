const User = require("../models/user");
const Mail = require("../models/mail");
const fs = require("fs");
const auth = require("../auth_check");
const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });

module.exports = function (router) {
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

            if ((isSender && !sender) || (!isSender && !receiver)) {
                return res.status(400).json({ err: "no such user" });
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

            if (labelName === "important") {
                mail.labels.important = !mail.labels.important;
            } else if (labelName === "spam") {
                mail.labels.spam = !mail.labels.spam;
            } else if (labelName === "unread") {
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

};