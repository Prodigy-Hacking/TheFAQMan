const { MessageEmbed } = require("discord.js");

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
