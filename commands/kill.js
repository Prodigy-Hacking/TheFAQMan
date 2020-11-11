const Discord = require("discord.js");
const client = new Discord.Client();
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
const token = "NzM3MTQyMDU1NjcwNzc1ODUw.Xx5DCQ.DHBsaFcDJ-5Wyz9Jy62-jQjWTJI"
module.exports = {
  name: "kill",
  description: "kills the bot",
  execute(message, args, client) {
    if (message.author.id !== "388813100964642816") return;
    try {
      message.channel.send("Shutting down...");
      client.destroy();
      sleep(5000);
      client.login(token)
      message.channel.send("Starting...")
      message.channel.send("Ready!")
    } catch (err) {
    }
  },
};
