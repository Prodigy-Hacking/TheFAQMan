const { ReactionCollector } = require("discord.js-collector");
const Discord = require("discord.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: console.log,
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
const client = new Discord.Client();
const jsonfile = require("jsonfile");
const file = "./questions.json";
const fs = require("fs");
const botSettings = require("../config.json");
const prefix = botSettings.prefix;
const editJsonFile = require("edit-json-file");
let file2 = editJsonFile(`./questions.json`);
const { MessageEmbed, DiscordAPIError } = require("discord.js");
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
    FAQTemp.tableName = guildid
    FAQTemp.sync();
    if (
      message.member.hasPermission(
        "ADMINISTRATOR",
        "MANAGE_SERVER",
        "KICK_MEMBERS"
      )
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
