const { description } = require("./ping");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "battle",
  description: "battle hacks",
  execute(message, args) {
    let embed = new MessageEmbed()
      .setColor("#ff9100")
      .addField(
        "battle Losses",
        "[battleLosses.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/battleLoses.js)",
        true
      )
      .addField(
        "Boss Difficulty",
        "[bossDifficulty.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/bossDifficulty.js)",
        true
      )
      .addField(
        "Escape battle",
        "[escapebattle.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/escapebattle.js)",
        true
      )
      .addField(
        "Free Catches!",
        "[freeCatches.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/freeCatches.js)",
        true
      )
      .addField(
        "Heal Team",
        "[healTeam.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/healTeam.js)",
        true
      )
      .addField(
        "Immortal",
        "[immortal.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/immortal.js)",
        true
      )
      .addField(
        "Infinite Catch Attempts",
        "[infiniteCatchAttempts.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/infiniteCatchAttempts.js)",
        true
      )
      .addField(
        "Instant Win!",
        "[instantWin.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/instantWin.js)",
        true
      )
      .addField(
        "Invincibility",
        "[invincibility.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/invincibility.js)",
        true
      )
      .addField(
        "All Monsters Level 1",
        "[monstersLevel1.js ](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/monstersLevel1.js)",
        true
      )
      .addField(
        "One Shot Enemy",
        "[oneShotEnemy.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/oneShotEnemy.js)",
        true
      )
      .addField(
        "Skip Enemy Turn",
        "[skipEnemyTurn.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/battle/skipEnemyTurn.js)",
        true
      )
      .setFooter(
        "Requested by " + message.author.username,
        message.author.displayAvatarURL({ format: "gif", dynamic: "true"})
      )
    message.channel.send(embed);
  }
};
