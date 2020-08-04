const { ReactionCollector } = require("discord.js-collector");
const Enmap = require("enmap");
const jsonfile = require("jsonfile");
const file = "./questions.json";
const { MessageEmbed } = require("discord.js");
function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const readline = require('readline');
const fs = require('fs');

module.exports = {
  name: "addfaq",
  description: "Creates a FAQ Q&A",
  execute(message, args) {
    
    let embedcollecttrigger = new MessageEmbed()
        .setColor("#ff9100")
        .addField("Enter your question, then send that", "Then after that, send your answer. It will be 2 messages")
    message.channel.send(embedcollecttrigger)
    message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        max: 2,
        time: 60000000
      })
      .then(collected => {
        var ID;
        ID = Math.random().toString(36).substr(2, 9);
        const obj = { Question: collected.first().content, Answer: collected.last().content};
        jsonfile.writeFileSync(file, obj , { spaces: 2, flag: "a", EOL: '\r\n' });
        message.channel.send("FAQ Logged!");
        // The collected.first().content is the first thing the sender of the initial message chats
        // The time: 60000000  represents that it won't collect data after 60 seconds
      });
  }
};
