#!/usr/bin/env node
'use strict';

const pj = require('./package');
const program = require('commander');
const RemotePublisher = require('./services/remote-publisher');

program
  .version(pj.version)
  .usage('[options] [ip] [port]')
  .option('-l, --local', 'Publish locally')
  .option('-i, --ip [ip]', 'Server ip', 'localhost')
  .option('-p, --port [port]', 'Server port', '8080')
  .option('-u, --user [user]', 'SSH User', 'root')
  .option('-r, --repository [value]', 'Repository name', null)
  .parse(process.argv);

let publisher = new RemotePublisher(pj.config.ip || program.ip, pj.config.port || program.port, pj.config.user || program.user, program.repository);
publisher.run();
