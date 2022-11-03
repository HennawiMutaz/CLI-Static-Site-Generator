#!/usr/bin/env node
const logger = require('../src/logger')('bin');
const arg = require('arg');
const chalk = require('chalk');
const getConfig = require('../src/config/config-mgr');
const start = require('../src/commands/start');

try {
  const args = arg({});

  logger.debug('Received args', args);
  let cmd = args['_'][0] || 'help'; 
  switch (cmd) {
    case 'help':
      usage();
      break;
    
    case 'start':
      const config = getConfig();
      start(config);
      break;  
  
    default:
      logger.warning(`${cmd} is not a command. Try: 'tool help' for list of commands.`);
      break;
  }

} catch (e) {
  logger.warning(e.message);
  console.log();
  usage();
}

function usage() {
  console.log(`\n${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('start')} ........ starts the app
  ${chalk.greenBright('help')} ........ shows help menu\n`);

  logger.log('1. Edit .md files in \'tool/src/pages\' (you can add more pages if you want).');
  logger.log('2. Run \'tool start\' to create your site!');
  logger.log('3. Your project will be in \'/dist\'');

}