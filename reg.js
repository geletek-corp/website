const fs = require('fs');

const hash = require('./hash');

function generateId() {
    return Math.floor(Math.random() * (999999999999999 - 100000000000000 + 1) + 100000000000000);
}

function controlId(id) {
    var newId = id;
    var users = JSON.parse(fs.readFileSync(`${__dirname}/database/users.json`, 'utf-8'));

    for (i in users) {
        if (users[i].id == id) {
            newId = generateId();
            break;
        }
    }

    return newId;
}

var reg = {
    page: (req, res) => {
        if (req.cookies.token) return res.redirect('/');

        res.render(`${__dirname}/views/reg/index.ejs`);
    },

    auth: (req, res) => {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        var emailError = false;

        var users = JSON.parse(fs.readFileSync(`${__dirname}/database/users.json`, 'utf-8')).users;

        for (i in users) {
            var user = JSON.parse(fs.readFileSync(`${__dirname}/database/users/${users[i].id}/user.json`, 'utf-8')).user;

            if (user.email == email) {
                emailError = true;
                break;
            }
        }

        if (emailError == false) {
            var token = hash.sha256hex(hash.sha256base64(username) + hash.sha256base64(email));
            var id = controlId(generateId()).toString();

            var date = new Date();

            var user = {
                id: id,
                admin: false,
                username: username,
                email: email,
                password: hash.sha256base64(password),
                friends: [],
                joinDay: date.getDate(),
                joinMonth: date.getMonth() + 1,
                joinYear: date.getFullYear()
            };

            fs.mkdirSync(`${__dirname}/database/users/${user.id}`);
            fs.writeFileSync(`${__dirname}/database/users/${user.id}/user.json`, JSON.stringify({
                user: user
            }), 'utf-8');
            fs.copyFileSync(`${__dirname}/database/avatar.png`, `${__dirname}/database/users/${user.id}/avatar.png`);

            users.push({
                id: user.id,
                token: token
            });

            fs.writeFileSync(`${__dirname}/database/users.json`, JSON.stringify({
                users: users
            }), 'utf-8');

            res.cookie('token', token);
            res.redirect('/');
        }
        else {
            res.redirect('/register?error=1');
        }
    }
};

module.exports = {
    page: reg.page,
    auth: reg.auth
};