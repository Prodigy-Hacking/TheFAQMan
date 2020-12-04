const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const { prefix } = require("./config.json");
client.commands = new Discord.Collection();
const { Sequelize } = require("sequelize");
var Honeybadger = require("honeybadger").configure({
  apiKey: "249af784",
});
const webhookClient = new Discord.WebhookClient(
  "779377397413314581",
  "RIBVE0pYmkQGmLhd4VcYBijMg5o6vMs88dZTp0BagZosbesWsjawapwcT7EgcJZNf-rb"
);
const DBL = require("dblapi.js");
let dbl = new DBL(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczNzE0MjA1NTY3MDc3NTg1MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA1MTA1MjE3fQ.Vs-Pc3BQ_YBJXWRdOZ4TizKpKEHa37uS-TiIUV4_g7E",
  { webhookPort: 5000, webhookAuth: "password" }
);
var consolere = require('console-remote-client').connect('console.re','80','thefaqman'); 

// Optional events
dbl.on("posted", () => {
  console.re.log("Server count posted!");
});

dbl.on("error", (e) => {
  console.re.log(`Oops! ${e}`);
  Honeybadger.notify(e);
});

dbl.webhook.on("ready", (hook) => {
  console.re.log(
    `Webhook running at https://canary.discord.com/api/webhooks/779377397413314581/RIBVE0pYmkQGmLhd4VcYBijMg5o6vMs88dZTp0BagZosbesWsjawapwcT7EgcJZNf-rb`
  );
});
dbl.webhook.on("vote", (vote) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("Someone Voted!")
    .setColor("#ff9100");

  webhookClient.send(`User with ID ${vote.user} just voted!`, {
    username: "some-username",
    avatarURL:
      "https://cdn.discordapp.com/attachments/695345270338355232/779392937511223337/3dgifmaker91407.gif",
    embeds: [embed],
  });
});
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: console.re.log,
  // SQLite only
  storage: "faqtemps.sqlite",
});
const FAQTemp = sequelize.define("faqtemps.sqlite", {
  Question: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true,
  },
  Answer: Sequelize.TEXT,
});
async function checkready() {
  try {
    await sequelize.authenticate();
    console.re.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
checkready();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

client.once("ready", () => {
  FAQTemp.sync();
  client.user.setActivity(client.guilds.cache.size + " servers", {
    type: "WATCHING",
  });
  console.re.log("My Body is ready.");
});
client.on("guildCreate", () => {
  // Fired every time the bot is added to a new server
  client.user.setActivity(client.guilds.cache.size + " servers", {
    type: "WATCHING",
  });
});

client.on("guildDelete", () => {
  // Fired every time the bot is removed from a server
  client.user.setActivity(client.guilds.cache.size + " servers", {
    type: "WATCHING",
  });
});
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.on("message", (message) => {
  const guild = client.guilds.cache.get(message.guild.id);
  const guildid = guild.id;
  FAQTemp.tableName = guildid;
  FAQTemp.sync();
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/@/g, "" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
  if (!message.content.startsWith(prefix) || message.channel.type == "dm")
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.channel.send(
      `\`An unexpected error has occurred! Please try again later! Please report this to @BoredFish#4269. More technical details:\` \`\`\`xl\n${clean(
        error
      )}\n\`\`\``
    );
    Honeybadger.notify(error);
  }
});

client.login(config.token);
