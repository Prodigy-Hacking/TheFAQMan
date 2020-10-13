const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "List CMDs",
  execute(message, args, client) {
    let embed = new MessageEmbed()
      .setColor("#ff9100")
      .addField("help", "This command!", true)
      .addField("addfaq", "Adds a FAQ to ", true)
      .addField("listfaq", "List all FAQ entries", true)
      .addField("ping", "Shows Ping", true)
      .addField("deletefaq", "Deletes a FAQ entry", true)
      .addField("battle", "Lists all battle hacks.", true)
      .setFooter(
        "Requested by " + message.author.username,
        message.author.displayAvatarURL()
      );
    message.channel.send(embed);
  },
};
