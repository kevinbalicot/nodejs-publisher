#!/usr/bin/env node
'use strict';

const pj = require('./package.json');
const program = require('commander');
const RemotePublisher = require('./services/remote-publisher');
const exec = require('child_process').exec;

program
  .version(pj.version)
  .usage('[options]')
  .option('-p, --port [port]', 'DEPRECATED - server port (for docker api)', '8888')
  .option('-i, --ip [ip]', 'ssh ip', 'localhost')
  .option('-u, --user [user]', 'ssh user', 'root')
  .option('-n, --name [name]', 'docker name', null)
  .option('-im --image [image]', 'docker image', 'node:latest');


program
    .command('list')
    .option('-i, --ip [ip]', 'ssh ip', 'localhost')
    .option('-u, --user [user]', 'ssh user', 'root')
    .description('List all containers running');

program
    .command('remove <name>')
    .option('-i, --ip [ip]', 'ssh ip', 'localhost')
    .option('-u, --user [user]', 'ssh user', 'root')
    .description('Remove container by name');

program
    .command('stop <name>')
    .option('-i, --ip [ip]', 'ssh ip', 'localhost')
    .option('-u, --user [user]', 'ssh user', 'root')
    .description('Stop container by name');

program
    .command('start <name>')
    .option('-i, --ip [ip]', 'Server ip', 'localhost')
    .option('-u, --user [user]', 'SSH User', 'root')
    .description('Start container by name');

program.parse(process.argv);

exec('cat $(pwd)/package.json', (err, stdout, stderr) => {
    let params = {};
    try {
        params = JSON.parse(stdout);
        params = params.publish || {};
    } catch (e) {
        console.log(e);
    }

    let publisher = new RemotePublisher(params.ip || program.ip, program.port, params.user || program.user, program.name, program.image);

    if (!!program.args.find(arg => arg === 'list')) {
        publisher.listContainers();
    } else if (!!program.args.find(arg => arg === 'remove')) {
        publisher.removeContainer(program.args[1]);
    } else if (!!program.args.find(arg => arg === 'stop')) {
        publisher.stopContainer(program.args[1]);
    } else if (!!program.args.find(arg => arg === 'start')) {
        publisher.startContainer(program.args[1]);
    } else {
        publisher.run();
    }
});
