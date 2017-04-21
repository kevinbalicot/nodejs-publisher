const colors = require('colors');

const SSHUtils = require('./../services/ssh-utils');

/**
 * SSHConnector module
 * @module SSHConnector
 */
class SSHConnector {

    /**
     * @param {string} ip
     * @param {string} [user='root']
     * @param {string|number} [port=22]
     *
     * @alias module:SSHConnector
     */
    constructor(ip, user = 'root', port = 22) {
        this.ip = ip;
        this.user = user;
        this.port = port;

        this.ssh = new SSHUtils(ip, user, port);
        this.time = (new Date()).getTime();
        this.remoteDir = `/var/docker-sources/${this.user}`;

        this.url = null;
    }

    /**
     * Publish container with ssh
     * @param {Object} container
     * @param {string} container.name
     * @param {string} container.image
     * @param {string} container.port
     *
     * @alias module:SSHConnector
     */
    publish(container) {
        this.remoteDir += `/${container.name || this.time}`;

        return this.ssh.exec(`mkdir -p ${this.remoteDir}`)
            .then(() => this.ssh.exec(`cd ${this.remoteDir} && rm -rf *`))
            .then(() => this.ssh.copy(`${container.zipPath}/${container.zipName}`, `${this.remoteDir}`))
            .then(() => this.ssh.exec(`unzip ${this.remoteDir}/${container.zipName} -d ${this.remoteDir}`))
            .then(() => {
                console.log('Installing node modules ...');
                return this.ssh.exec(`cd ${this.remoteDir} && npm install`);
            })
            .then(() => {
                if (container.name !== null) {
                    return this.removeContainer(container.name);
                }

                return;
            })
            .then(() => {
                if (container.port) {
                    return container.port;
                }

                return net.getFreePort(this.ip)
            })
            .then(port => {
                console.log('Try to run container on port ' + port);
                this.url = `http://${this.ip}:${port}`;
                // HERE check if there are Dockerfile
                return this.ssh.exec(`docker run -d ${container.name !== null ? '--name ' + container.name : ''} --volume ${this.remoteDir}:/volume --workdir /volume --publish ${port}:8080/tcp ${container.image} "npm start"`, false);
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
     * @alias module:SSHConnector
     */
    startContainer(name) {
        return this.ssh.exec(`docker start ${name}`, false)
            .then(uid => console.log(`Container ${uid} started !`.green))
            .catch(err => console.log(String(err).red));
    }

    /**
     * Remove remote container by name or ID
     * @param {string} name
     *
     * @return {Promise}
     *
     * @alias module:SSHConnector
     */
    removeContainer(name) {
        return this.ssh.exec(`docker rm -f ${name}`, false)
            .then(uid => console.log(`Container ${uid} removed !`.green))
            .catch(err => console.log(String(err).red));
    }

    /**
     * Stop remote container by name or ID
     * @param {string} name
     *
     * @return {Promise}
     *
     * @alias module:SSHConnector
     */
    stopContainer(name) {
        return this.ssh.exec(`docker stop ${name}`, false)
            .then(uid => console.log(`Container ${uid} stopped !`.green))
            .catch(err => console.log(String(err).red));
    }

    /**
     * List remote containers
     *
     * @return {Promise}
     *
     * @alias module:SSHConnector
     */
    listContainers() {
        return this.ssh.exec('docker ps -a');
    }
}

module.exports = SSHConnector;
