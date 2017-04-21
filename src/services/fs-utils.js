const exec = require('child_process').exec;
const fs = require('fs');
const colors = require('colors');

/**
 * FsUtils module
 * @module FsUtils
 */
class FsUtils {

    /**
     * Make a pwd command
     * @return {Promise}
     *
     * @alias module:FsUtils
     */
    static pwd() {
        return new Promise((resolve, reject) => {
            exec('echo $(pwd)', (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(stdout.trim());
            });
        });
    }

    /**
     * Make a mkdir command
     * @param {string} path
     *
     * @return {Promise}
     *
     * @alias module:FsUtils
     */
    static mkdir(path) {
        console.log(`Creating ${path} directory ...`);
        return new Promise((resolve, reject) => {
            exec(`mkdir -p ${path}`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(path);
            });
        });
    }

    /**
     * Make a move command
     * @param {string} source
     * @param {string} path
     *
     * @return {Promise}
     *
     * @alias module:FsUtils
     */
    static move(source, path) {
        console.log(`Moving ${source} to ${path} ...`);
        return new Promise((resolve, reject) => {
            exec(`mv ${source} ${path}`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(path);
            });
        });
    }

    /**
     * Make a copy command
     * @param {string} source
     * @param {string} directory
     *
     * @return {Promise}
     *
     * @alias module:FsUtils
     */
    static copyDir(source, directory) {
        console.log(`Copping ${source} to ${directory} ...`);
        return new Promise((resolve, reject) => {
            exec(`cp -r ${source} ${directory}`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(directory);
            });
        });
    }

    /**
     * Make a remove directory command
     * @param {string} directory
     *
     * @return {Promise}
     *
     * @alias module:FsUtils
     */
    static removeDir(directory) {
        console.log(`Removing ${directory} directory ...`);
        return new Promise((resolve, reject) => {
            exec(`rm -rf ${directory}`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(directory);
            });
        });
    }

    /**
     * Make a zip command
     * @param {string} path
     * @param {string} name
     *
     * @return {Promise}
     *
     * @alias module:FsUtils
     */
    static zip(path, name) {
        console.log(`Creating zip named ${name} of ${path} directory ...`);
        return new Promise((resolve, reject) => {
            exec(`cd ${path} && zip -r ${name}.zip . -x node_modules\\*`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                console.log(String(stdout).yellow);

                return resolve(stdout.trim());
            });
        });
    }

    /**
     * Make a unzip command
     * @param {string} file
     * @param {string} directory
     *
     * @return {Promise}
     *
     * @alias module:FsUtils
     */
    static unzip(file, directory) {
        console.log(`Unzipping ${file} into ${directory} ...`);
        return new Promise((resolve, reject) => {
            exec(`unzip ${file} -d ${directory}`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    /**
     * Execute command
     * @param {string} command
     *
     * @return {Promise}
     *
     * @alias module:FsUtils
     */
    static exec(command) {
        console.log(`Exec ${command} ...`);
        return new Promise((resolve, reject) => {
            exec(command, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(stdout.trim());
            });
        });
    }
}

module.exports = FsUtils;
