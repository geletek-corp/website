module.exports = function cdn(req, res) {
    res.sendFile(__dirname + '/' + req.url.split('/').slice(2).join('/'));
}