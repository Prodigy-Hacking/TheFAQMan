const Sequelize = require("sequelize");
var Honeybadger = require('honeybadger').configure({
  apiKey: '249af784'
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
    allowNull: false,
  },
  Answer: Sequelize.TEXT,
});
const { MessageEmbed } = require("discord.js");
function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/@/g, "" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

module.exports = {
  name: "deletefaq",
  description: "Deletes a FAQ Q&A",
  execute(message, args, client) {
    const guild = client.guilds.cache.get(message.guild.id);
    const guildid = guild.id;
    FAQTemp.tableName = guildid;
    FAQTemp.sync();
    if (
      message.member.hasPermission("ADMINISTRATOR") ||
      message.author.id === "388813100964642816" ||
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.hasPermission("KICK_MEMBERS")
    ) {
      try {
        const QandA = args.join(" ");
        FAQTemp.destroy({ where: { Question: QandA } });
        let embeddelete = new MessageEmbed()
          .setColor("#ff9100")
          .addField("FAQ " + QandA, "Was deleted.")
          .setFooter(
            "Requested by " + message.author.username,
            message.author.displayAvatarURL({ format: "jpg", dynamic: "true" })
          );
        message.channel.send(embeddelete);
        FAQTemp.sync();
      } catch (error) {
        Honeybadger.notify(error);
        console.error(error);
        message.channel.send(
          `\`An unexpected error has occured! Please try again later! Please report this to @BoredFish#4269. More technical details:\` \`\`\`xl\n${clean(
            error
          )}\n\`\`\``
        );
      }
    } else {
      let embeddeleteabort = new MessageEmbed()
        .setColor("#ff9100")
        .addField(
          "Deletion aborted.",
          "You do not have the required permissions to do this!"
        )
        .setFooter(
          "Requested by " + message.author.username,
          message.author.displayAvatarURL({ format: "jpg", dynamic: "true" })
        );
      message.channel.send(embeddeleteabort);
      FAQTemp.sync();
    }
  },
};
