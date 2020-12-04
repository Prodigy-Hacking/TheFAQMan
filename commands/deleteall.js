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
const FAQTemp = sequelize.define(
  "faqtemps.sqlite",
  {
    Question: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false
    },
    Answer: Sequelize.TEXT,
  },
);
function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/@/g, "" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}
module.exports = {
  name: "deleteall",
  description: "Deletes a FAQ Q&A",
  execute(message, args, client) {
    const guild = client.guilds.cache.get(message.guild.id);
    const guildid = guild.id;
    FAQTemp.tableName = guildid
    FAQTemp.sync();
    if (message.member.hasPermission("ADMINISTRATOR")) {
      try {
        FAQTemp.findAndCountAll();
        FAQTemp.destroy({
          truncate: true,
        });
        message.reply("Deleted all faqs");
        FAQTemp.sync();
      } catch (error) {
        Honeybadger.notify(error);
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
      FAQTemp.sync();
    }
  },
};
