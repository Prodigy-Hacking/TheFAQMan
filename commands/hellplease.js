const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "hellplease",
  description: "yes",
  execute(message, args, client) {
    if (message.channel.id == "706892226726330489") {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        try {
          message.channel.send("%hellplease \n Ok then :wink:");
        } catch (error) {
          console.error(error);
          message.channel.send(
            `\`An unexpected error has occured! No FAQs were deleted. More technical details:\` \`\`\`xl\n${clean(
              error
            )}\n\`\`\``
          );
          FAQTemp.sync();
        }
      } else {
        message.reply("Whoops! Looks like you aren't an admin.");
      }
    } else {
      message.reply("Don't")
    }
  },
};
