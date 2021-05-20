const state = require('../state');

module.exports = {
  name: 'draft',
  description: 'Draft',
  execute(message, args) {
    if (!args[0]) {
      message.channel.send('You need to include a pappelitos');
      return;
    }

    state.isDraftEnabled = true;
    state.maxPappelitos = parseInt(args[0]);

    message.channel.send('Pappelitos starts!');
  },
};
