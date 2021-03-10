const Sequelize = require("sequelize");
const { MessageEmbed } = require("discord.js");
var Honeybadger = require("honeybadger").configure({
  apiKey: "249af784",
});

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: console.re.log,
  // SQLite only
  storage: "faqtemps.sqlite",
});
const FAQTemp = sequelize.define("faqtemps.sqlite", {
  Question: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  Answer: Sequelize.TEXT,
});
const Op = Sequelize.Op;
function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/@/g, "" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

module.exports = {
  name: "editfaq",
  description: "Edits a FAQ",
  execute(message, args, client) {
    if (
      message.member.hasPermission("ADMINISTRATOR") ||
      message.author.id === "388813100964642816" ||
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.hasPermission("KICK_MEMBERS")
    ) {
      const guild = client.guilds.cache.get(message.guild.id);
      const guildid = guild.id;
      FAQTemp.tableName = guildid;
      FAQTemp.sync();
      const quest = args.join(" ");
      async function questionfaq() {
        (async () => {
          try {
            let faq = JSON.stringify(
              await FAQTemp.findOne({
                where: {
                  Question: {
                    [Op.like]: quest,
                  },
                },
              })
            );
          } catch (error) {
            Honeybadger.notify(error);
            console.error(error);
            message.channel.send(
              "That FAQ doesn't exist! Please respond with a valid FAQ!"
            );
          }
        })();
      }
      questionfaq();
      let editfaqembed1 = new MessageEmbed()
        .setColor("#ff9100")
        .addField(
          `Alright, the current answer for the question ${faq.Question} is ${faq.Answer}. Would you like to update that?`
        )
        .setFooter(
          "Requested by " + message.author.username,
          message.author.displayAvatarURL({ format: "jpg", dynamic: "true" })
        );
      message.channel.send(editfaqembed1);
      message.channel
        .awaitMessages((m) => m.author.id == message.author.id, {
          max: 1,
          time: 60000000,
        })
        .then((collected) => {
          if (collected.first().content == "Yes" || "yes") {
            let editfaqembed2 = new MessageEmbed()
              .setColor("#ff9100")
              .addField(
                `Alright, please send 1 message with the new answer! Remember, whatever you type will overwrite what was there.`
              )
              .setFooter(
                "Requested by " + message.author.username,
                message.author.displayAvatarURL({
                  format: "jpg",
                  dynamic: "true",
                })
              );
            message.channel.send(editfaqembed2);
            message.channel
              .awaitMessages((m) => m.author.id == message.author.id, {
                max: 1,
                time: 60000000,
              })
              .then((collected) => {
                try {
                  const NewAnswer = collected.first().content;
                  faq.Answer = NewAnswer;
                  await;
                  faq.save();
                  message.channel.send("Success! The answer was saved.");
                } catch (error) {
                  Honeybadger.notify(error);
                  console.re.log(error);
                  FAQTemp.sync();
                  message.channel.send(
                    `\`Uh Oh! Something went wrong! Please try again later! Please report this to @BoredFish#4269. More technical details:\` \`\`\`xl\n${clean(
                      error
                    )}\n\`\`\``
                  );
                }
              });
          } else if (collected.first().content == "No" || "no") {
            message.channel.send("Alright, Aborting!");
          }
        });
    } else {
      message.channel.send(
        "You do not have the right permissions to execute this command! Try again with the right permissions."
      );
    }
  },
};
