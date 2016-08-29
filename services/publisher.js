'use strict';

const fs = require('./fs-utils');

class Publisher {

    constructor (ip, port, user, name = null) {
        this.ip = ip;
        this.port = port;
        this.name = name;
        this.user = user;
        this.time = (new Date()).getTime();
        this.tmp = `/tmp/${this.name || this.time}`;

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
                console.log(`Container must be running at ${this.finalUrl}`);
                this.clean()
            });
    }
}

module.exports = Publisher;
