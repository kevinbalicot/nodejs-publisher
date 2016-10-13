'use strict';

const fs = require('./fs-utils');

class Publisher {

    constructor (ip, port, user, name = null, image = 'node:latest') {
        this.ip = ip;
        this.port = port;
        this.name = name;
        this.user = user;
        this.image = image;
        this.time = (new Date()).getTime();
        this.tmp = `/tmp/${this.name || this.time}`;
        this.remoteDir = `/var/docker-sources/${this.user}/${this.name || this.time}`;

        this.finalUrl = null;
    }

    prepare () {
        return fs.mkdir(this.tmp);
    }

    publish () {}

    clean () {
        fs.removeDir(this.tmp);
    }

    run () {
        this.prepare()
            .then(() => this.publish())
            .then(() => {
                console.log(`Container must be running at ${this.finalUrl}`.cyan);
                this.clean()
            });
    }
}

module.exports = Publisher;
