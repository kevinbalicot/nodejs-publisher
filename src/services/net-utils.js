const net = require('net');
const dgram = require('dgram');
const colors = require('colors');

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
    getFreePort(host, port = 9000) {
        return new Promise((resolve, reject) => {
            const client = new net.Socket();

            client.connect({ host, port }, () => {
                client.destroy();
                console.log(`port ${port} already used!`.yellow);
                
                return resolve(this.getFreePort(host, ++port));
            }).on('error', err => resolve(port));
        });
    }
}

module.exports = new NetUtils();
