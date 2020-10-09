const Discord = require("discord.js");
const bot = new Discord.Client();
const myEnmap = require("./myEnmap.js");
module.exports = {
  name: "eval",
  description: "Eval Code",
  execute(message, args, client) {
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/@/g, "" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    if (message.content.startsWith(">" + "eval")) {
      if (message.author.id !== "388813100964642816") return;
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), { code: "js" });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  },
};
