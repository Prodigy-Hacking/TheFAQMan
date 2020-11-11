const { ReactionCollector } = require("discord.js-collector");
const Discord = require("discord.js");
const Sequelize = require("sequelize");
const client = new Discord.Client();
const jsonfile = require("jsonfile");
const file = "./questions.json";
const fs = require("fs");
const botSettings = require("../config.json");
const prefix = botSettings.prefix;
const editJsonFile = require("edit-json-file");
let file2 = editJsonFile(`./questions.json`);
const { MessageEmbed } = require("discord.js");
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

module.exports = {
  name: "faq",
  description: "Finds a FAQ Q&A",
  execute(message, args, client) {
    const guild = client.guilds.cache.get(message.guild.id);
    const guildid = guild.id;
    FAQTemp.tableName = guildid;
    FAQTemp.sync();
    const QandA = args.join(" ");
    async function questionfaq() {
      (async () => {
        try {
          let faq = JSON.stringify(
            await FAQTemp.findOne({
              where: { Question: QandA },
            })
          );
          faq = JSON.parse(faq);
          const faqembed = new Discord.MessageEmbed()
            .setColor("#ff9100")
            .setTitle(`Question: ${faq.Question}`)
            .setDescription(`Answer: ${faq.Answer}`)
            .setFooter(`Faq Created at ${faq.createdAt}`)
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({
                format: "jpg",
                dynamic: "true",
              })
            );
          message.channel.send(faqembed);
        } catch (error) {
          console.error(error);
          message.channel.send(
            "That FAQ doesn't exist! Please respond with a valid FAQ!"
          );
        }
      })();
    }
    questionfaq();
    FAQTemp.sync();
  },
};
