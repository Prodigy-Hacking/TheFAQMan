const { ReactionCollector } = require("discord.js-collector");
const Enmap = require("enmap");
const jsonfile = require("jsonfile");
const file = "./questions.json";
const fs = require('fs');
const botSettings = require("../config.json")
const prefix = botSettings.prefix;
const editJsonFile = require("edit-json-file");
let file2 = editJsonFile(`./questions.json`);

module.exports = {
  name: "faq",
  description: "Finds a FAQ Q&A",
  execute(message, args) {
    
  }
};
