#!/usr/bin/env node
'use strict';

const exec = require('child_process').exec;
const fs = require('fs');
const program = require('commander');
const request = require('request');

const home = '/Users/kevinbalicot/published';
const time = (new Date()).getTime();
const target = `${home}/${time}`;
const ip = '92.222.88.16';
const port = '8080';
const apiUrl = `http://${ip}:${port}`;
const remoteRepository = `git@${ip}:/var/docker-sources`;

program
  .version('0.0.1')
  .usage('[options]')
  .option('-l, --local', 'Publish locally')
  .option('-r, --repository', 'Repository name')
  .parse(process.argv);

function createRemoteRepository (name) {
    return new Promise((resolve, reject) => {
        request
            .post(`${apiUrl}/repositories`, (err, res, body) => {
                console.log('Creating remote repository ...');
                console.log(`> ${res.statusCode}`);

                if (err) {
                    return reject(err);
                }

                return resolve(body);
            })
            .form({ name: name });
    });
}

function cloneRemoteRepository (name) {
    return new Promise((resolve, reject) => {
        request
            .post(`${apiUrl}/repositories/clone`, (err, res, body) => {
                console.log('Cloning remote repository ...');
                console.log(`> ${res.statusCode}`);
                console.log(body);

                if (err) {
                    return reject(err);
                }

                return resolve(body);
            })
            .form({ path: `${remoteRepository}/${name}.git`, name: name + '_clone' });
    });
}

function initLocalRepository () {
    return new Promise((resolve, reject) => {
        exec('git init', (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            console.log('Locally initializing repository ...');
            //console.log(`> ${stdout}`);

            return resolve(stdout);
        });
    });
}

function removeRepository (target = 'origin') {
    return new Promise((resolve, reject) => {
        exec(`git remote rm ${target}`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            console.log(`Removing repository on target ${target} ...`);

            return resolve(stdout);
        });
    });
}

function addRepository (name, target = 'origin') {
    return new Promise((resolve, reject) => {
        exec(`git remote add ${target} ${remoteRepository}/${name}.git`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            console.log(`Adding repository on target ${target} ...`);

            return resolve(stdout);
        });
    });
}

function pushToRepository () {
    return new Promise((resolve, reject) => {
        exec(`git push origin master`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            console.log(`Pushing to repository ...`);

            return resolve(stdout);
        });
    });
}

function createDiffFile () {
    return new Promise((resolve, reject) => {
        exec(`echo ${time} > .diff`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            console.log(`Creating gitingore file...`);

            return resolve(stdout);
        });
    });
}

function createIgnoreFile () {
    return new Promise((resolve, reject) => {
        exec(`echo node_modules > .gitignore`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            console.log(`Creating gitingore file...`);

            return resolve(stdout);
        });
    });
}

function addFiles () {
    return new Promise((resolve, reject) => {
        exec(`git add . && git commit -m "Initial commit"`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            console.log(`Adding files ...`);

            return resolve(stdout);
        });
    });
}

const repositoryName = program.repository || time;
createRemoteRepository(repositoryName)
    .then(() => initLocalRepository())
    .then(() => addRepository(repositoryName))
    .then(() => createIgnoreFile())
    .then(() => createDiffFile())
    .then(() => addFiles())
    .then(() => pushToRepository())
    .then(() => cloneRemoteRepository(repositoryName))
    .then(() => removeRepository())
    .catch(err => {
        removeRepository();
        console.log(err);
    });

/*
let directoryState = fs.statSync(home);
if (!directoryState.isDirectory()) {
    fs.mkdirSync(home);
}

function pwd () {
    return new Promise((resolve, reject) => {
        exec('echo $(pwd)', (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            return resolve(stdout.trim());
        });
    });
}

function zip (path, name) {
    console.log(`Create zip named ${name} of ${path} directory.`);
    return new Promise((resolve, reject) => {
        exec(`cd ${path} && zip -r ${name}.zip . -x node_modules\*`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            return resolve(`${path}/${name}.zip`);
        });
    });
}

function unzip (file, directory) {
    console.log(`Unzip ${file} into ${directory}`);
    return new Promise((resolve, reject) => {
        exec(`unzip ${file} -d ${directory}`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            return resolve();
        });
    });
}

function mkdir (path) {
    console.log(`Create ${path} directory.`);
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err, folder) => {
            if (!!err) {
                return reject(err);
            }

            return resolve(folder);
        })
    });
}

function move (source, directory) {
    console.log(`Move ${source} to ${directory}.`);
    return new Promise((resolve, reject) => {
        exec(`mv ${source} ${directory}`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            return resolve(directory);
        });
    });
}

function install (path) {
    return new Promise((resolve, reject) => {
        exec(`cd ${path} && npm install`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            console.log('Installing ...');

            return resolve(stdout);
        });
    });
}

function start (path) {
    return new Promise((resolve, reject) => {
        exec(`cd ${path} && npm start`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            console.log('Running ...');

            return resolve(stdout);
        });
    });
}

function startDocker (path) {
    return new Promise((resolve, reject) => {
        exec(`cd ${path} && docker run -d --volume $(pwd):/app --env NODE_PORT=8080 --publish 8080:8080/tcp mkenney/npm start`, (err, stdout, stderr) => {
            if (!!err) {
                return reject(err);
            }

            console.log(stdout);

            return resolve(stdout);
        });
    });
}

mkdir(target)
    .then(() => pwd())
    .then(path => zip(path, time))
    .then(path => move(path, target))
    .then(path => unzip(`${path}/${time}.zip`, target))
    .then(() => install(target))
    .then(() => startDocker(target))
    .then(() => console.log('done.'))
    .catch(err => console.log(err))
;
*/
