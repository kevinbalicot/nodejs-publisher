const net = require('net');

/**
 * NetUtils module
 * @module NetUtils
 */
class NetUtils {

    /**
     * @param {string} host
     * @param {string|number} port
     *
     * @return {Promise}
     *
     * @alias module:NetUtils
     */
    static isFreePort(host, port) {
        const client = new net.Socket();

        return new Promise((resolve, reject) => {
            client.connect({ host, port }, () => {
                reject();
                client.destroy();
            }).on('error', err => {
                resolve(port);
            });
        });
    }

    /**
     * @param {string} host
     * @param {string|number} [port=9000]
     *
     * @return {Promise}
     *
     * @alias module:NetUtils
     */
    static getFreePort(host, port = 9000) {
        return NetUtils.isFreePort(host, port)
            .catch(err => NetUtils.getFreePort(host, ++port));
    }
}

module.exports = NetUtils;
