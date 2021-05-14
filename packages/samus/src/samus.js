const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const players = [];
const wordCollection = [];

client.on("message", (msg) => {
  const player = { id: msg.author.id, username: msg.author.username };

  if (!players.find((p) => p.id === player.id)) {
    players.push(player);
  }

  wordCollection.push({
    playerId: player.id,
    word: msg.content,
  });

  players.forEach((p) => {
    const wordCollectionAsList = wordCollection.reduce(
      (acc, prev) => acc + prev,
      ""
    );
    // console.log("Sending to player", p.id);
    // console.log(wordCollectionAsList);
  });

  const replyFunc = async () => {
    const user = await client.users.fetch("140585543229505536");

    if (!user) return msg.channel.send("User not found :(");

    await user.send("message").catch(() => {
      msg.channel.send(
        "User has DMs closed or has no mutual servers with the bot :("
      );
    });
  };

  //   replyFunc();

  if (msg.content === "!ping") {
    msg.reply("pong");
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
