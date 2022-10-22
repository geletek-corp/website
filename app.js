const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const server = app.listen(3000);

const mainMiddleware = (req, res, next) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`${ip} logged`);
}

const main = require('./main');
const cdn = require('./cdn');
const avatar = require('./avatar');

const log = require('./log');
const reg = require('./reg');

const api = require('./api');

const profile = require('./profile');

//app.use(mainMiddleware);
app.use(cookieParser());

app.use(express.urlencoded({
    extended: true
}));

app.get('/', main.page);

app.get('/login', log.page);
app.get('/register', reg.page);

app.post('/log/auth', log.auth);
app.post('/reg/auth', reg.auth);

app.get('/api/get/friends/:id', api.getFriends);
app.get('/api/get/username/:id', api.getUsername);
app.get('/api/get/join-date/:id', api.getJoinDate);
app.get('/api/get/is-admin/:id', api.getIsAdmin);

app.get('/profile/:id', profile.page);

app.get('/avatar/:id', avatar);
app.get('/cdn/*', cdn);