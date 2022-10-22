const fs = require('fs');

var profile = {
    page: (req, res) => {
        var id = null;

        if (req.cookies.token) {
            var users = JSON.parse(fs.readFileSync(`${__dirname}/database/users.json`, 'utf-8')).users;
            var user = null;

            for (i in users) {
                console.log(users[i]);

                if (users[i].token == req.cookies.token) {
                    user = JSON.parse(fs.readFileSync(`${__dirname}/database/users/${users[i].id}/user.json`, 'utf-8')).user;
                    break;
                }
            }

            id = user.id;
        }

        res.render(`${__dirname}/views/profile/index.ejs`, {
            id: id
        });
    }
};

module.exports = {
    page: profile.page
};