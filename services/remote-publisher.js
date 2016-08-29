'use strict';

const Publisher = require('./publisher');
const fs = require('./fs-utils');
const SshUtils = require('./ssh-utils');
const DockerApiUtils = require('./docker-api-utils');

class RemotePublisher extends Publisher {

    constructor (ip, port, user, name) {
        super(ip, port, user, name);
        this.ssh = new SshUtils(ip, user);
        this.docker = new DockerApiUtils(ip, port);
    }

    prepare () {
        return super.prepare()
            .then(() => fs.pwd())
            .then(pwd => fs.copyDir(`${pwd}/*`, this.tmp))
            .then(() => fs.zip(this.tmp, this.time))
            .catch(err => console.log(err));
    }

    publish () {
        return this.ssh.exec(`mkdir /var/docker-sources/${this.time}`)
            .then(() => this.ssh.copy(`${this.tmp}/${this.time}.zip`, `/var/docker-sources/${this.time}`))
            .then(() => this.ssh.exec(`unzip /var/docker-sources/${this.time}/${this.time}.zip -d /var/docker-sources/${this.time}`))
            .then(() => {
                console.log('Installing node modules ...');
                return this.ssh.exec(`cd /var/docker-sources/${this.time} && npm install`);
            })
            .then(() => this.docker.getFreePort())
            .then(port => {
                this.docker.runContainer(this.getContainerOptions(port), this.name);
                this.finalUrl = `http://${this.ip}:${port}`;
            })
            .catch(err => console.log(err));
    }

    getContainerOptions (port) {
        console.log('Try to run container on port ' + port);

        return JSON.parse(`{
            "Image": "node:6",
            "WorkingDir": "/volume",
            "Volumes": { "/volume": {} },
            "Cmd": ["npm", "start"],
            "ExposedPorts": { "8080/tcp": {} },
            "Env": ["NODE_PORT=8080"],
            "LogPath": "/var/docker-sources/${this.time}/${this.time}.log",
            "HostConfig": {
                "Binds": ["/var/docker-sources/${this.time}:/volume"],
                "PortBindings": { "8080/tcp": [{ "HostPort": "${port}" }] }
            }
        }`);
    }
}

module.exports = RemotePublisher;
