#!/usr/bin/env node

const exec = require('child_process').exec;
const pj = require('./../package.json');
const program = require('commander');

const SSHConnector = require('./connectors/ssh');
const LocalConnector = require('./connectors/local');
const Publisher = require('./services/publisher');

program
  .version(pj.version)
  .usage('[options]')
  .option('-i, --ip [ip]', 'ssh ip', null)
  .option('-u, --ssh-user [user]', 'ssh user', null)
  .option('-P, --ssh-port [port]', 'ssh port', null)
  .option('-p --port [port]', 'try to use custom port (default: automatically)')
  .option('-n, --name [name]', 'docker name', null)
  .option('-im --image [image]', 'docker image', null);

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
    let connector = {};
    let container = {};

    try {
        let pj = JSON.parse(stdout);
        params = pj.publish || {};
        params.name = pj.name || null;
    } catch (e) {
        console.log(e);
    }

    if (!!params.ssh || !!program.sshUser) {
        connector = new SSHConnector(
            program.ip || params.ssh.ip,
            program.sshUser || params.ssh.user,
            program.sshPort || params.ssh.port || 22
        );
    } else {
        connector = new LocalConnector();
    }

    container.name = program.name || params.name;
    container.image = program.image || params.image;
    container.port = program.port || params.port;

    let publisher = new Publisher(connector, container);

    if (!!program.args.find(arg => arg === 'list')) {
        connector.listContainers();
    } else if (!!program.args.find(arg => arg === 'remove')) {
        connector.removeContainer(program.args[1] || params.name);
    } else if (!!program.args.find(arg => arg === 'stop')) {
        connector.stopContainer(program.args[1] || params.name);
    } else if (!!program.args.find(arg => arg === 'start')) {
        connector.startContainer(program.args[1] || params.name);
    } else {
        publisher.run();
    }
});
