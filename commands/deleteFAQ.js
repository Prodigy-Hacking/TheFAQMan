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
const { MessageEmbed, DiscordAPIError } = require("discord.js");

module.exports = {
  name: "deletefaq",
  description: "Deletes a FAQ Q&A",
  execute(message, args) {
    myEnmap.faqs.fetchAll;
    if (message.member.hasPermission("ADMINISTRATOR")) {
      myEnmap.faqs.evict(args);
      myEnmap.faqs.delete(args);
      let embeddelete = new MessageEmbed()
        .setColor("#ff9100")
        .addField("FAQ " + args, "Was deleted.");
      message.channel.send(embeddelete);
    } else {
      let embeddeleteabort = new MessageEmbed()
        .setColor("#ff9100")
        .addField(
          "Deletion aborted.",
          "You do not have the required permissions to do this!"
        );
      message.channel.send(embeddeleteabort);
    }
  },
};
