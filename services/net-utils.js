'use strict';

const net = require('net');

class NetUtils {

    static isFreePort (host, port) {
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

    static getFreePort (host, port = 9000) {
        return NetUtils.isFreePort(host, port)
            .catch(err => NetUtils.getFreePort(host, ++port));
    }
}

module.exports = NetUtils;
