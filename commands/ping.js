const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  name: "ping",
  description: "Ping tester",
  execute(message, args, client) {
    var ping = Math.round(client.ws.ping) + " ms";
    let embed = new MessageEmbed()
      .setColor("#42f2f5")
      .addField("Pong!", ping, true)
    message.channel.send(embed);
  },
};
