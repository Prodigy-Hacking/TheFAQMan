const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Info about the user.",
  execute(message, args, client) {
    const taggedUser = message.mentions.members.first();
    let val = args
    if (taggedUser) {
      let embed = new MessageEmbed()
        .setColor("#42f2f5")
        .setThumbnail(
          taggedUser.user.displayAvatarURL({ format: "jpg", dynamic: "true" })
        )
        .setTitle("Userinfo of " + taggedUser.user.username)
        .setFooter(
          "Requested by " + message.author.username,
          message.author.displayAvatarURL({ format: "jpg", dynamic: "true" })
        )
        .addField("User created at?", taggedUser.user.createdAt, true)
        .addField("User Tag", taggedUser.user.tag, true)
        .addField("User @", `<@${taggedUser.id}>`, true)
        .addField("User's Last message sent", taggedUser.user.lastMessage, true)
        .addField("User ID", taggedUser.id, true)
        .addField("User is Bot?", taggedUser.user.bot, true)
        .addField("User joined at?", taggedUser.joinedAt, true)
      message.channel.send(embed);
    } else if (!message.mentions.users.size) {
      message.channel.send(
        "User did not mention user, ID was used, or user mentioned does not exist. Sending user info of message author..."
      );
      let embed = new MessageEmbed()
        .setColor("#42f2f5")
        .setThumbnail(
          message.author.displayAvatarURL({ format: "png", dynamic: "true" })
        )
        .setTitle("Userinfo of " + message.author.username)
        .setFooter(
          "Requested by " + message.author.username,
          message.author.displayAvatarURL({ format: "jpg", dynamic: "true" })
        )
        .addField("User created at?", message.author.createdAt, true)
        .addField("User Tag", message.author.tag, true)
        .addField("User @", `<@${message.author.id}>`, true)
        .addField("User's Last message sent", message.author.lastMessage, true)
        .addField("User ID", message.author.id, true)
        .addField("User is Bot?", message.author.bot, true)
        .addField("User joined at?", message.member.joinedAt, true)
      message.channel.send(embed);
    }
  },
};
