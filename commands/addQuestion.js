const Discord = require("discord.js");
var Honeybadger = require("honeybadger").configure({
  apiKey: "249af784",
});
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
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addfaq",
  description: "Creates a FAQ Q&A",
  execute(message, args, client) {
    const guild = client.guilds.cache.get(message.guild.id);
    const guildid = guild.id;
    FAQTemp.tableName = guildid;
    FAQTemp.sync();
    let embedcollecttrigger = new MessageEmbed()
      .setColor("#ff9100")
      .addField(
        "Enter your question, then send that",
        "Then after that, send your answer. It will be 2 messages"
      )
      .setFooter(
        "Requested by " + message.author.username,
        message.author.displayAvatarURL({ format: "jpg", dynamic: "true" })
      );
    message.channel.send(embedcollecttrigger);
    message.channel
      .awaitMessages((m) => m.author.id == message.author.id, {
        max: 2,
        time: 60000000,
      })
      .then((collected) => {
        if (
          message.member.hasPermission("ADMINISTRATOR") ||
          message.author.id === "388813100964642816" ||
          message.member.hasPermission("MANAGE_GUILD") ||
          message.member.hasPermission("KICK_MEMBERS")
        ) {
          try {
            FAQTemp.create({
              Question: collected.first().content,
              Answer: collected.last().content,
            });
            FAQTemp.sync();
            return message.reply(
              `Question ${collected.first().content} added.`
            );
          } catch (e) {
            if (e.Question === "SequelizeUniqueConstraintError") {
              FAQTemp.sync();
              return message.reply("That FAQ already exists.");
            }
            Honeybadger.notify(e);
            console.log(e);
            FAQTemp.sync();
            return message.reply("Something went wrong with adding a FAQ.");
          }
        } else {
          message.channel.send(
            "Oops! looks like you don't have the right permissions!"
          );
        }
      });
  },
};
