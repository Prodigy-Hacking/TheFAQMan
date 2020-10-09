const { ReactionCollector } = require("discord.js-collector");
const Discord = require("discord.js");
const Enmap = require("enmap");
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
  settings: new Enmap({
    name: "questionarray",
    autoFetch: true,
    fetchAll: true
  }),
  faqs: new Enmap("questionarray")
}
