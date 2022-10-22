const crypto = require('crypto');

function sha256hex(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

function sha256base64(input) {
    return crypto.createHash('sha256').update(input).digest('base64');
}

module.exports = {
    sha256hex,
    sha256base64
};