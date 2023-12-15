const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express');
const router = express.Router();

const User = require("../models/User.model");

router.get("/signup", (req, res, next) => {
    res.render("auth/signup")
});


router.post("/signup", (req, res, next) => {

    const { username, email, password } = req.body;

            bcrypt.hash(password, saltRounds)
                .then((hash) => {
                    console.log('hash', hash)
                    return User.create({ username, email, password: hash})
                })
                .then(user => {
                    res.redirect(`/profile`)
                })
            .catch(err => console.log(err))
});

router.get("/profile", (req, res, next) => {
    res.render("auth/profile");
});

module.exports = router;