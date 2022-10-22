const fs = require('fs');

var API = {
    getUsername(req, res) {
        var user = JSON.parse(fs.readFileSync(`${__dirname}/database/users/${req.params.id}/user.json`, 'utf-8')).user;

        res.json({
            username: user.username
        });
    },

    getFriends(req, res) {
        var user = JSON.parse(fs.readFileSync(`${__dirname}/database/users/${req.params.id}/user.json`, 'utf-8')).user;

        res.json({
            friends: user.friends
        });
    },

    getJoinDate(req, res) {
        var user = JSON.parse(fs.readFileSync(`${__dirname}/database/users/${req.params.id}/user.json`, 'utf-8')).user;

        res.json({
            joinDay: user.joinDay,
            joinMonth: user.joinMonth,
            joinYear: user.joinYear
        });
    }
}

module.exports = {
    getFriends: API.getFriends,
    getUsername: API.getUsername,
    getJoinDate: API.getJoinDate
};