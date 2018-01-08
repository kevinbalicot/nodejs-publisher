const colors = require('colors');

const fsUtils = require('./../services/fs-utils');
const netUtils = require('./../services/net-utils');

/**
 * LocalConnector module
 * @module LocalConnector
 */
class LocalConnector {

    /**
     * @alias module:LocalConnector
     */
    constructor() {
        this.remoteDir = `~/.docker-sources`;
        this.url = null;
    }

    /**
     * Publish container with ssh
     * @param {Object} container
     * @param {string} container.name
     * @param {string} container.image
     * @param {string} container.port
     * @param {string} container.zipName
     * @param {string} container.zipPath
     *
     * @alias module:LocalConnector
     */
    publish(container) {
        const debug = container.debug;
        this.remoteDir += `/${container.name || (new Date()).getTime()}`;

        return fsUtils.mkdir(this.remoteDir)
            .then(() => fsUtils.removeDir(`${this.remoteDir}/*`))
            .then(() => fsUtils.copyDir(`${container.zipPath}/${container.zipName}`, `${this.remoteDir}`))
            .then(() => fsUtils.unzip(`${this.remoteDir}/${container.zipName}`, this.remoteDir))
            .then(() => fsUtils.exec(!!container.preinstall ? `cd ${this.remoteDir} && ${container.preinstall}` : container.preinstall, debug))
            .then(() => {
                console.log('Installing node modules ...');
                return fsUtils.exec(`cd ${this.remoteDir} && npm install --production`, debug);
            })
            .then(() => fsUtils.exec(!!container.postinstall ? `cd ${this.remoteDir} && ${container.postinstall}` : container.postinstall, debug))
            .then(() => {
                if (container.name !== null) {
                    return this.removeContainer(container.name);
                }

                return;
            })
            .then(() => netUtils.getFreePort(this.ip, container.port))
            .then(port => {
                console.log(`trying to run container on port ${port}`.yellow);
                this.url = `http://localhost:${port}`;

                return fsUtils.exec(`ls -l ${this.remoteDir}`).then(data => {
                    let env = '';
                    for (let prop in container.env) {
                        env += `--env ${prop}=${container.env[prop]}`;
                    }

                    if (data.match(/Dockerfile/i)) {
                        console.log('found Dockerfile, building image.'.yellow);

                        return fsUtils.exec(`cd ${this.remoteDir} && docker build -t ${container.name}-image .`, debug)
                            .then(() => fsUtils.exec(`docker run -d --name ${container.name} --publish ${port}:8080/tcp ${env} ${container.options} ${container.name}-image`, debug));
                    } else {
                        return fsUtils.exec(`docker run -d --name ${container.name} --volume ${this.remoteDir}:/volume --workdir /volume --publish ${port}:8080/tcp ${env} ${container.options} ${container.image} npm start`, debug);
                    }
                });
            })
            .then(uid => console.log(`Container ${uid} running !`.green))
            .catch(err => console.log(String(err).red));
    }

    /**
     * Start remote container by name or ID
     * @param {string} name
     *
     * @return {Promise}
     *
     * @alias module:LocalConnector
     */
    startContainer(name) {
        return fsUtils.exec(`docker start ${name}`)
            .then(uid => console.log(`Container ${uid} started !`.green))
            .catch(err => console.log(String(err).red));
    }

    /**
     * Remove remote container by name or ID
     * @param {string} name
     *
     * @return {Promise}
     *
     * @alias module:LocalConnector
     */
    removeContainer(name) {
        return fsUtils.exec(`docker rm -f ${name}`)
            .then(uid => console.log(`Container ${uid} removed !`.green))
            .catch(err => console.log(String(err).red));
    }

    /**
     * Stop remote container by name or ID
     * @param {string} name
     *
     * @return {Promise}
     *
     * @alias module:LocalConnector
     */
    stopContainer(name) {
        return fsUtils.exec(`docker stop ${name}`)
            .then(uid => console.log(`Container ${uid} stopped !`.green))
            .catch(err => console.log(String(err).red));
    }

    /**
     * List remote containers
     *
     * @return {Promise}
     *
     * @alias module:LocalConnector
     */
    listContainers() {
        return fsUtils.exec('docker ps -a')
            .then(list => console.log(list))
            .catch(err => console.log(String(err).red))
    }
}

module.exports = LocalConnector;
