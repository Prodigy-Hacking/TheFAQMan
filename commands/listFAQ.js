const { ReactionCollector } = require("discord.js-collector");
const Enmap = require("enmap");
const myEnmap = require("./myEnmap.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const jsonfile = require("jsonfile");
const file = "./questions.json";
const fs = require("fs");
const botSettings = require("../config.json");
const prefix = botSettings.prefix;
const editJsonFile = require("edit-json-file");
let file2 = editJsonFile(`./questions.json`);
const { MessageEmbed } = require("discord.js");
const { cpuUsage } = require("process");

module.exports = {
  name: "listfaq",
  description: "Lists all FAQ Q&A IDs",
  execute(message, args) {
    myEnmap.faqs.fetchAll
    message.channel.send(myEnmap.faqs.indexes);
  },
};
