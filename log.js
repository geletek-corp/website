const fs = require('fs');

const hash = require('./hash');

var log = {
    page: (req, res) => {
        if (req.cookies.token) return res.redirect('/');

        res.render(`${__dirname}/views/log/index.ejs`);
    },

    auth: (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        var users = JSON.parse(fs.readFileSync(`${__dirname}/database/users.json`, 'utf-8')).users;

        for (i in users) {
            var user = JSON.parse(fs.readFileSync(`${__dirname}/database/users/${users[i].id}/user.json`, 'utf-8')).user;

            if (user.email == email &&
                user.password == hash.sha256base64(password))
            {
                res.cookie('token', users[i].token);
                return res.redirect('/');
            }
        }

        res.redirect('/login?error=1');
    }
};

module.exports = {
    page: log.page,
    auth: log.auth
};