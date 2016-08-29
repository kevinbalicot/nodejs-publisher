'use strict';

const exec = require('child_process').exec;

class SSHUtils {

    constructor (ip, user = 'root') {
        this.user = user;
        this.ip = ip;
    }

    exec (cmd) {
        return new Promise((resolve, reject) => {
            exec(`ssh ${this.user}@${this.ip} "${cmd}"`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                console.log(stdout);

                return resolve(stdout);
            });
        });
    }

    copy (file, path) {
        return new Promise((resolve, reject) => {
            exec(`scp ${file} ${this.user}@${this.ip}:${path}`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                console.log(stdout);

                return resolve(stdout);
            });
        });
    }
}

module.exports = SSHUtils;
