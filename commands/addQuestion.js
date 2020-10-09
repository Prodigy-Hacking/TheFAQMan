const { ReactionCollector } = require("discord.js-collector");
const Enmap = require("enmap");
const myEnmap = require("./myEnmap.js");
const jsonfile = require("jsonfile");
const file = "QandA/questions.json";
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client();
function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const readline = require("readline");
const fs = require("fs");
const { cpuUsage } = require("process");


module.exports = {
  name: "addfaq",
  description: "Creates a FAQ Q&A",
  execute(message, args) {
    let embedcollecttrigger = new MessageEmbed()
      .setColor("#ff9100")
      .addField(
        "Enter your question, then send that",
        "Then after that, send your answer. It will be 2 messages"
      );
    message.channel.send(embedcollecttrigger);
    message.channel
      .awaitMessages((m) => m.author.id == message.author.id, {
        max: 2,
        time: 60000000,
      })
      .then((collected) => {
        if ((message.member.hasPermission("ADMINISTRATOR", "MANAGE_SERVER", "KICK_MEMBERS"))) {
          
          function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }
         var ID;
         ID = makeid(5);
          
          function sendFAQChannel() {
            let channel = client.channels.cache.get("701517404659777666")
            let faqqanda = new MessageEmbed()
                .setColor("#ff9100")
                .addField(myEnmap.faqs.observe(ID), ID);
              client.channels.cache.get('701517404659777666');
              channel.send(faqqanda);
          }
          myEnmap.faqs.fetchAll
          myEnmap.faqs.set(ID, [
            "Question: ",
            collected.first().content,
            "Answer: ",
            collected.last().content,
          ]);
          message.channel.send("FAQ Saved! ID is- " + ID);
          sendFAQChannel();
        } else {
          message.channel.send(
            "Oops! looks like you don't have the right permissions!"
          );
        }

        // The collected.first().content is the first thing the sender of the initial message chats
        // The time: 60000000  represents that it won't collect data after 60 seconds
      });
  },
};
