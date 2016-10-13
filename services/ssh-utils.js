'use strict';

const exec = require('child_process').exec;
const colors = require('colors');

class SSHUtils {

    constructor (ip, user = 'root', port = 22) {
        this.user = user;
        this.ip = ip;
        this.port = port;
    }

    exec (cmd, consoleLog = true) {
        return new Promise((resolve, reject) => {
            exec(`ssh ${this.user}@${this.ip} -p ${this.port} "${cmd}"`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                if (consoleLog) {
                    console.log(String(stdout).yellow);
                }

                return resolve(stdout);
            });
        });
    }

    copy (file, path) {
        return new Promise((resolve, reject) => {
            console.log(`Coping ${file} at ${this.ip}:${path} ...`);
            exec(`scp -P ${this.port} ${file} ${this.user}@${this.ip}:${path}`, (err, stdout, stderr) => {
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
