require('dotenv').config();
const state = require('./state');

const Discord = require('discord.js');
const WOKCommands = require('wokcommands');
const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION'],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  new WOKCommands(client, {
    commandDir: 'commands',
  });
});

client.on('message', (msg) => {
  if (msg.author.bot) return;

  if (msg.channel.type === 'dm') {
    const currentPlayer = {
      id: msg.author.id,
      username: msg.author.username,
    };

    if (state.isDraftEnabled) {
      const playerCollection = state.wordCollection.find(
        (w) => w.playerId === currentPlayer.id
      );
      if (playerCollection) {
        playerCollection.words.push(msg.content);
      } else {
        state.wordCollection.push({
          playerId: currentPlayer.id,
          words: [msg.content],
        });
      }
    } else {
      msg.channel.send('Im not ready to write pappelitos');
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
