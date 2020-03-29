const crypto = require('crypto')

module.exports =  function genreateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}