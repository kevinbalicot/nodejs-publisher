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
        console.log(`creating ${path} directory.`.yellow);
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
        console.log(`moving ${source} to ${path}.`.yellow);
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
        console.log(`copping ${source} to ${directory}`.yellow);
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
        console.log(`removing ${directory} directory`.yellow);
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
        console.log(`creating zip named ${name} of ${path} directory`.yellow);
        return new Promise((resolve, reject) => {
            exec(`cd ${path} && zip -r ${name}.zip . -x node_modules\\*`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

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
        console.log(`unzipping ${file} into ${directory}`.yellow);
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
