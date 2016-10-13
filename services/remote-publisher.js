'use strict';

const Publisher = require('./publisher');
const fs = require('./fs-utils');
const SshUtils = require('./ssh-utils');
const DockerApiUtils = require('./docker-api-utils');
const colors = require('colors');

class RemotePublisher extends Publisher {

    constructor (ip, port, user, name, image) {
        super(ip, port, user, name, image);
        this.ssh = new SshUtils(ip, user);
        this.docker = new DockerApiUtils(ip, port);
    }

    prepare () {
        return super.prepare()
            .then(() => fs.pwd())
            .then(pwd => fs.copyDir(`${pwd}/*`, this.tmp))
            .then(() => fs.zip(this.tmp, this.time))
            .catch(err => console.log(String(err).red));
    }

    publish () {
        return this.ssh.exec(`mkdir -p ${this.remoteDir}`)
            .then(() => this.ssh.exec(`cd ${this.remoteDir} && rm -rf *`))
            .then(() => this.ssh.copy(`${this.tmp}/${this.time}.zip`, `${this.remoteDir}`))
            .then(() => this.ssh.exec(`unzip ${this.remoteDir}/${this.time}.zip -d ${this.remoteDir}`))
            .then(() => {
                console.log('Installing node modules ...');
                return this.ssh.exec(`cd ${this.remoteDir} && npm install`);
            })
            .then(() => {
                if (this.name !== null) {
                    return this.ssh.exec(`docker stop ${this.name} && docker rm ${this.name}`, false)
                        .catch(err => {});
                }
            })
            .then(() => this.docker.getFreePort())
            .then(port => {
                console.log('Try to run container on port ' + port);
                this.finalUrl = `http://${this.ip}:${port}`;
                return this.ssh.exec(`docker run -d ${this.name !== null ? '--name ' + this.name : ''} --volume ${this.remoteDir}:/volume --workdir /volume --publish ${port}:8080/tcp ${this.image} "npm start"`, false);
            })
            .then(uid => console.log(`Container ${uid} running !`.green))
            .catch(err => console.log(String(err).red));
    }

    listContainers () {
        return this.ssh.exec('docker ps -a');
    }

    removeContainer (name) {
        return this.ssh.exec(`docker rm -f ${name}`, false)
            .then(uid => console.log(`Container ${uid} removed !`.green))
            .catch(err => console.log(String(err).red));
    }

    stopContainer (name) {
        return this.ssh.exec(`docker stop ${name}`, false)
            .then(uid => console.log(`Container ${uid} stopped !`.green))
            .catch(err => console.log(String(err).red));
    }

    startContainer (name) {
        return this.ssh.exec(`docker start ${name}`, false)
            .then(uid => console.log(`Container ${uid} started !`.green))
            .catch(err => console.log(String(err).red));
    }
}

module.exports = RemotePublisher;
