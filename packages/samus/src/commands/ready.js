const state = require('../state');

module.exports = {
  name: 'ready',
  description: 'Ready',
  callback({ message }) {
    try {
      console.log('State', state);
      console.log('Wordcollection', state.wordCollection);
      state.wordCollection.forEach((wc) => {
        if (wc.words.length !== state.maxPappelitos) {
          throw new Error();
        }
      });

      message.channel.send('Ready to play!');
    } catch (err) {
      message.channel.send(
        'FAILED! There is a player with wrong number of pappelitos'
      );
    }
  },
};
