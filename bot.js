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
var consolere = require('console-remote-client').connect('console.re','80','thefaqman'); 
const oAuth = Discord.OAuth2Application;
// dotenv
require('dotenv').config();
// Dashboard package
const dashboard = require("discord-bot-dashboard");

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
