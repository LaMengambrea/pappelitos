require('dotenv').config();
const state = require('./state');

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../src/commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.author.bot) return;

  let prefix = '!';
  const args = msg.content.slice(prefix.length).trim().split(/ +/);

  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) {
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

    return;
  }

  const command = client.commands.get(commandName);

  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
