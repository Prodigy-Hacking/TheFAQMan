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
    const addfaqdiag = {
        question: "Please enter your question",
        answer: "Please enter the answer"
    }
    let embed = new MessageEmbed()
        .setColor("#ff9100")
        .addFields(
            {name: "This is the command to add a quetion and answer!", value: "Otherwise it won't work!"},
            {name: "You have to do it very specifically. It has to be formatted like this", value: "Question:[question here] Answer: [answer here]. Now send"}
        )
    message.channel.send(embed);
    async function FAQAandA(channel) {
        let dialogueResults = [];
        for (const line of Object.entries(bugFormDialogue)) {
            const embedcollecttrigger = new MessageEmbed()
            .setColor("#ff9100")
            .addField("Now, type your FAQ!", "please")
            await channel.send(FAQQandA).then(async () => await waitForResponse(dialogueResults));
        }
    }
    async function waitForResponse(dialogueResults) {
        let filter = m => m.author.id === member.id && !m.author.bot;
        await channel.awaitMessages((() => true), {max: 1}).then(async (collected) => {
            collected.forEach(async (msg) => {
                await Promise.resolve(
                    filter(msg) ? msg.content : await waitForResponse(dialogueResults)
                ).then(val => dialogueResults.push(val.slice(0, 800)));
            });
        });
    }
    message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        max: 2,
        time: 60000000
      })
      .then(collected => {
        var ID;
        ID = Math.random().toString(36).substr(2, 9);
        const obj = { ID, FAQ: collected.first().content};
        jsonfile.writeFileSync(file, obj , { spaces: 2, flag: "a", EOL: '\r\n' });
        message.channel.send("FAQ Logged");
        // The collected.first().content is the first thing the sender of the initial message chats
        // The time: 60000000  represents that it won't collect data after 60 seconds
      });
  }
};
