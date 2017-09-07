const exec = require('child_process').exec;
const colors = require('colors');

/**
 * SSHUtils module
 * @module SSHUtils
 */
class SSHUtils {

    /**
     * @param {string} ip
     * @param {string} [user='root']
     * @param {string|number} [port=22]
     *
     * @alias module:SSHUtils
     */
    constructor(ip, user = 'root', port = 22) {
        this.user = user;
        this.ip = ip;
        this.port = port;
    }

    /**
     * Exec command by ssh
     * @param {string} cmd
     * @param {boolean} consoleLog
     *
     * @return {Promise}
     */
    exec(cmd, consoleLog = false) {
        return new Promise((resolve, reject) => {
            exec(`ssh ${this.user}@${this.ip} -p ${this.port} "${cmd}"`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                if (consoleLog) {
                    console.log(String(stdout.trim()).yellow);
                }

                return resolve(stdout.trim());
            });
        });
    }

    /**
     * Copy file by ssh
     * @param {string} file
     * @param {string} path
     *
     * @return {Promise}
     */
    copy(file, path) {
        return new Promise((resolve, reject) => {
            console.log(`coping ${file} at ${this.ip}:${path}`.yellow);
            exec(`scp -P ${this.port} ${file} ${this.user}@${this.ip}:${path}`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(stdout.trim());
            });
        });
    }
}

module.exports = SSHUtils;
