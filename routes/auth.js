const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

module.exports = function (passport) {

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.getById(id)
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },
        async (login, password, done) => {

            try {
                let user = await User.getByLogin(login);
                if (!user) return done(null, false, { message: 'Incorrect login.' });

                let res = await User.validatePassword(login, password);
                if (!res) return done(null, false, { message: 'Incorrect password.' });

                return done(null, user);

            } catch (err) {
                return done(err);
            }
        }
    ));

    router.get('/register', (req, res) => {
        res.render('register', { user: req.user });
    });

    router.post('/register', async (req, res) => {
        const login = req.body.login;
        const password = req.body.password;
        const publicKey = req.body.publicKey;

        User.insert({ login, password, publicKey})
                    .then(() => res.redirect('/auth/login'))
                    .catch(err => res.status(500).send(err.toString()));
    });

    router.get('/login', (req, res) => {
        res.render('login', { user: req.user });
    });

    router.post("/login", (req, res, next) => {
        passport.authenticate('local',  (err, user, info) => {

            if (err || !user) {
                return res.status(400).json({
                    message: `Something is not right: ${JSON.stringify(info)}`,
                    user: user
                });
            }
            
            req.login(user,  (err) => {
                if (err) return res.send(err);
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
                return res.json({ user, token });
            });
        })(req, res, next);
    });

    router.get('/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        });

    return router;
};