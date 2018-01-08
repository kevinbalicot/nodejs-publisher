const fs = require('./fs-utils');

/**
 * Publisher module
 * @module Publisher
 */
class Publisher {

    /**
     * @param {Connector} connector
     * @param {Object} container
     * @param {string} container.name
     * @param {string} container.image
     * @param {string} container.port
     *
     * @alias module:Publisher
     */
    constructor (connector, container) {
        this.connector = connector;
        this.container = container;

        this.time = (new Date()).getTime();
        this.tmp = `/tmp/${this.name || this.time}`;
    }

    /**
     * Prepare tmp folder
     * @return {Promise}
     *
     * @alias module:Publisher
     */
    prepare() {
        return fs.mkdir(this.tmp)
            .then(() => fs.pwd())
            .then(pwd => fs.copyDir(`${pwd}/*`, this.tmp))
            .then(() => fs.zip(this.tmp, this.time))
            .then(() => {
                this.container.zipName = `${this.time}.zip`;
                this.container.zipPath = this.tmp;
            })
            .catch(err => console.log(String(err).red));
    }

    /**
     * Remove tmp folder
     * @return {Promise}
     *
     * @alias module:Publisher
     */
    clean() {
        return fs.removeDir(this.tmp);
    }

    /**
     * Run process
     * @return {Promise}
     *
     * @alias module:Publisher
     */
    run() {
        return this.prepare()
            .then(() => this.connector.publish(this.container))
            .then(() => {
                console.log(`Container must be running at ${this.connector.url}`.cyan);
                return this.clean();
            });
    }
}

module.exports = Publisher;
