require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const players = [];
const wordCollection = [];

client.on('message', (msg) => {
  if (msg.author.bot) return;

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
