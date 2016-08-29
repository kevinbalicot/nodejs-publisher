'use strict';

const exec = require('child_process').exec;
const fs = require('fs');

class FsUtils {

    static pwd () {
        return new Promise((resolve, reject) => {
            exec('echo $(pwd)', (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(stdout.trim());
            });
        });
    }

    static mkdir (path) {
        console.log(`Creating ${path} directory ...`);
        return new Promise((resolve, reject) => {
            fs.mkdir(path, (err, folder) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(folder);
            })
        });
    }

    static move (source, path) {
        console.log(`Moving ${source} to ${directory} ...`);
        return new Promise((resolve, reject) => {
            exec(`mv ${source} ${directory}`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(directory);
            });
        });
    }

    static copyDir (source, directory) {
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

    static removeDir (directory) {
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

    static zip (path, name) {
        console.log(`Creating zip named ${name} of ${path} directory ...`);
        return new Promise((resolve, reject) => {
            exec(`cd ${path} && zip -r ${name}.zip . -x node_modules\\*`, (err, stdout, stderr) => {
                if (!!err) {
                    return reject(err);
                }

                console.log(stdout);

                return resolve(stdout);
            });
        });
    }

    static unzip (file, directory) {
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
}

module.exports = FsUtils;
