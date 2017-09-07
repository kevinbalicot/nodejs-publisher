const colors = require('colors');

const SSHUtils = require('./../services/ssh-utils');
const netUtils = require('./../services/net-utils');

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
                console.log('installing node modules'.yellow);
                return this.ssh.exec(`cd ${this.remoteDir} && npm install --production`);
            })
            .then(() => {
                if (container.name !== null) {
                    return this.removeContainer(container.name);
                }

                return;
            })
            .then(() => netUtils.getFreePort(this.ip, container.port))
            .then(port => {
                console.log(`trying to run container on port ${port}`.yellow);
                this.url = `http://${this.ip}:${port}`;

                return this.ssh.exec(`ls -l ${this.remoteDir}`).then(data => {
                    if (data.match(/Dockerfile/i)) {
                        console.log('found Dockerfile, building image.'.yellow);

                        return this.ssh.exec(`cd ${this.remoteDir} && docker build -t ${container.name}-image .`)
                            .then(() => this.ssh.exec(`docker run -d --name ${container.name} --publish ${port}:8080/tcp ${container.name}-image`));
                    } else {
                        return this.ssh.exec(`docker run -d --name ${container.name} --volume ${this.remoteDir}:/volume --workdir /volume --publish ${port}:8080/tcp ${container.image} "npm start"`);
                    }
                });
            })
            .then(uid => console.log(`Container ${uid} running!`.green))
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
            .then(uid => console.log(`Container ${uid} started!`.green))
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
            .then(uid => console.log(`Container ${uid} removed!`.green))
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
            .then(uid => console.log(`Container ${uid} stopped!`.green))
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
