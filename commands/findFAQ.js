const Sequelize = require("sequelize");
const { MessageEmbed } = require("discord.js");
var Honeybadger = require("honeybadger").configure({
  apiKey: "249af784",
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
const Op = Sequelize.Op;


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
              where: {
                Question: {
                  [Op.like]: QandA,
                },
              },
            })
          );
          faq = JSON.parse(faq);
          const faqembed = new MessageEmbed()
            .setColor("#ff9100")
            .addField(faq.Question, "Question")
            .addField(faq.Answer, "Answer")
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
          Honeybadger.notify(error);
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
