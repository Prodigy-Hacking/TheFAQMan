const { ReactionCollector } = require("discord.js-collector");
const Enmap = require("enmap");
const editJsonFile = require("edit-json-file");
let file = editJsonFile(`./questions.json`);module.exports = {
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
        file.set('question', collected.first().content);
        message.channel.send('Question Logged!');
        console.log(collected.first().content);
        // The collected.first().content is the first thing the sender of the initial message chats
        // The time: 60000000  represents that it won't collect data after 60 seconds
      });
}
};
