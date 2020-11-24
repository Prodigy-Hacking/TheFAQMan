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
      .addField("Server Name", guild.name, true)
      .addField("Server Owner", guild.owner, true)
      .addField("Server Created?", guild.createdAt, true)
      .addField("Member Count", guild.memberCount, true)
      .addField("Server ID", guild.id, true)
      .addField("Partnered?", guild.partnered, true)
      .addField("Boost Count", guild.premiumSubscriptionCount, true)
      .addField("Boost Level", guild.premiumTier, true)
      .addField("Server Region", guild.region, true)
      .addField("Server Verified?", guild.verified, true);
    message.channel.send(embed);
  },
};
