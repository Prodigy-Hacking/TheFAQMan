const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "info about server",
  execute(message, args, client) {
    const guild = client.guilds.cache.get(message.guild.id);
    let embed = new MessageEmbed()
      .setColor("#42f2f5")
      .setThumbnail(guild.iconURL())
      .setFooter(
        "Requested by " + message.author.username,
        message.author.displayAvatarURL({ format: "gif", dynamic: "true"})
      )
      .addField("Server Name", guild.name)
      .addField("Server Owner", guild.owner)
      .addField("Server Created?", guild.createdAt)
      .addField("Member Count", guild.memberCount)
      .addField("Server ID", guild.id)
      .addField("Partnered?", guild.partnered)
      .addField("Boost Count", guild.premiumSubscriptionCount)
      .addField("Boost Level", guild.premiumTier)
      .addField("Server Region", guild.region)
      .addField("Server Verified?", guild.verified);
    message.channel.send(embed);
  },
};
