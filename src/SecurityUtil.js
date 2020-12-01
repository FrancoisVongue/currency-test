const bcrypt = require('bcrypt');

exports.obfuscatePassword = async (passwd) => {
    return await new Promise((res, rej) => {
        bcrypt.hash(passwd, 10, function(err, hash) {
            if(err)
                rej(err);
            else
                res(hash);
        });
    })
}
exports.comparePassword = async (plainPasswd, hashedPasswd) => {
    return await new Promise((res, rej) => {
        bcrypt.compare(plainPasswd, hashedPasswd, function(err, result) {
            if(err)
                rej(err);
            else
                res(result);
        });
    })
}
