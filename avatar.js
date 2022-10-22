module.exports = function avatar(req, res) {
    res.sendFile(`${__dirname}/database/users/${req.params.id}/avatar.png`);
}