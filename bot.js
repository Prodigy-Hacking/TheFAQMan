const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const { prefix } = require("./config.json");
client.commands = new Discord.Collection();





const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));


client.once("ready", () => {
  console.log("My Body is ready.");
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.on("message", (message) => {
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/@/g, "" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.channel.send(
      `\`An unexpected error has occured! Please try again later! Please report this to @BoredFish#4269. More technical details:\` \`\`\`xl\n${clean(
        error
      )}\n\`\`\``
    );
  }
});

client.login(config.token);
