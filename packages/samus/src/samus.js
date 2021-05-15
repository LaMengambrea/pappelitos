require('dotenv').config();

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

const players = [];
const wordCollection = [];

client.on('message', (msg) => {
  if (msg.author.bot) return;

  let prefix = '!';
  const args = msg.content.slice(prefix.length).trim().split(/ +/);

  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }

  const player = { id: msg.author.id, username: msg.author.username };

  if (!players.find((p) => p.id === player.id)) {
    players.push(player);
    console.log('Players', players);
  }

  wordCollection.push({
    playerId: player.id,
    word: msg.content,
  });

  const wordCollectionAsList = wordCollection.reduce(
    (prev, acc) => prev + acc.word + '\n',
    ''
  );
  msg.channel.send('Words:\n' + wordCollectionAsList);
});

client.login(process.env.DISCORD_BOT_TOKEN);
