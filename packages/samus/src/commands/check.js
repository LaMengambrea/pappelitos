const state = require('../state');

module.exports = {
  name: 'check',
  description: 'Check',
  execute(message) {
    if (message.channel.type === 'dm') {
      const x = state.wordCollection.find(
        (w) => w.playerId === message.author.id
      );

      const wordsFromCurrentPlayer = x.words.reduce(
        (prev, acc) => prev + acc + '\n',
        ''
      );

      message.author.send('Your words are:\n' + wordsFromCurrentPlayer);
    }
  },
};
