const { ReactionCollector } = require("discord.js-collector");
const Enmap = require("enmap");
const jsonfile = require("jsonfile");
const file = "./questions.json";
function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
  name: "addquestion",
  description: "Creates a FAQ Q&A",
  execute(message, args) {
    message.channel.send("Please type your question!");
    message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        max: 1,
        time: 60000000
      })
      .then(collected => {
        var ID;
        ID = Math.random().toString(36).substr(2, 9);
        const obj = { ID, question: collected.first().content };
        jsonfile.writeFileSync(file, obj , { flag: "a", EOL: '\r\n' });
        message.channel.send("Question Logged!");
        // The collected.first().content is the first thing the sender of the initial message chats
        // The time: 60000000  represents that it won't collect data after 60 seconds
      });
  }
};
