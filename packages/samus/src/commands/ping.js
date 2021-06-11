const state = require('../state');

module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(message, args) {
    message.channel.send('Pong.');
    console.log(args);
    console.log('State is ', state);
  },
};
