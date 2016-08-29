'use strict';

const request = require('request');

class DockerApiUtils {

    constructor (ip, port) {
        this.ip = ip;
        this.port = port;
        this.apiUrl = `http://${this.ip}:${this.port}`;
    }

    getFreePort () {
        return new Promise((resolve, reject) => {
            request
                .get(`${this.apiUrl}/free-port`, (err, res, body) => {
                    if (err) {
                        return reject(err);
                    }

                    let data = JSON.parse(body);
                    return resolve(data.message);
                });
        });
    }

    runContainer (params, name = null) {
        return new Promise((resolve, reject) => {
            request({
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(params),
                method: 'POST',
                uri: `${this.apiUrl}/containers/run?name=${name}`
            }, (err, res, body) => {
                let data = JSON.parse(body);
                console.log('Running container ...');
                console.log(`> ${res.statusCode} : ${data[0].status}`);

                if (err) {
                    return reject(err);
                }

                return resolve(body);
            });
        });
    }
}

module.exports = DockerApiUtils;
