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
    let embed = new MessageEmbed()
        .setColor("#ff9100")
        .addFields(
            {name: "This is the command to add a quetion and answer!", value: "Otherwise it won't work!"},
            {name: "You have to do it very specifically. It has to be formatted like this", value: "Question:[question here] Answer: [answer here]"}
        )
    message.channel.send(embed);
    let embedcollecttrigger = new MessageEmbed()
        .setColor("#ff9100")
        .addField("Now, type your FAQ!", "please")
    message.channel.send(embedcollecttrigger)
    message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        max: 1,
        time: 60000000
      })
      .then(collected => {
        var ID;
        ID = Math.random().toString(36).substr(2, 9);
        const obj = { ID, FAQ: collected.first().content};
        jsonfile.writeFileSync(file, obj , { flag: "a", EOL: '\r\n' });
        message.channel.send("FAQ Logged");
        // The collected.first().content is the first thing the sender of the initial message chats
        // The time: 60000000  represents that it won't collect data after 60 seconds
      });
  }
};
