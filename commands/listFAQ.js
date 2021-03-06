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

module.exports = {
  name: "listfaq",
  description: "Lists all FAQ Q&A IDs",

  execute(message, args, client) {
    const guild = client.guilds.cache.get(message.guild.id);
    const guildid = guild.id;
    FAQTemp.tableName = guildid;
    FAQTemp.sync();
    async function listallfaq() {
      const faqList = await FAQTemp.findAll({ attributes: ["Question"] });
      const faqString =
        faqList.map((t) => t.Question).join(", ") || "No FAQs exist.";
      let listfaqembed = new MessageEmbed()
        .setColor("#ff9100")
        .addField(faqString, "Use `>faq [Question here]` to list it!")
        .setFooter(
          "Requested by " + message.author.username,
          message.author.displayAvatarURL({ format: "jpg", dynamic: "true" })
        );
      message.channel.send(listfaqembed);
    }
    try {
      listallfaq();
      FAQTemp.sync();
    } catch (error) {
      Honeybadger.notify(error);
    }
  },
};
