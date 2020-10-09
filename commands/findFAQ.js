const { ReactionCollector } = require("discord.js-collector");
const Discord = require("discord.js");
const Enmap = require("enmap");
const myEnmap = require("./myEnmap.js");
const client = new Discord.Client();
const jsonfile = require("jsonfile");
const file = "./questions.json";
const fs = require("fs");
const botSettings = require("../config.json");
const prefix = botSettings.prefix;
const editJsonFile = require("edit-json-file");
let file2 = editJsonFile(`./questions.json`);
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "faq",
  description: "Finds a FAQ Q&A",
  execute(message, args) {
    myEnmap.faqs.fetchAll;
    const idexist = myEnmap.faqs.has(args);
    let embedfaq = new MessageEmbed()
      .setColor("#ff9100")
      .addField(myEnmap.faqs.observe(args), args);
    message.channel.send(embedfaq);
  },
};
