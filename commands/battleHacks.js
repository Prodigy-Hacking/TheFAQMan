const { description } = require("./ping");
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'battle',
    description: 'Battle hacks',
    execute(message, args){
        let embed = new MessageEmbed()
        .setColor('#ff9100')
        .addFields(
            { name: "Battle Losses", value: '[battleLosses.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/battleLoses.js)'},
            { name: "Boss Difficulty", value: '[bossDifficulty.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/bossDifficulty.js)'},
            { name: "Escape Battle", value: '[escapeBattle.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/escapeBattle.js)'},
            { name: "Free Catches!", value: '[freeCatches.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/freeCatches.js)'},
            { name: "Heal Team", value: '[healTeam.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/healTeam.js)'},
            { name: "Immortal", value: '[immortal.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/immortal.js)'},
            { name: "Infinite Catch Attempts", value: '[infiniteCatchAttempts.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/infiniteCatchAttempts.js)'},
            { name: "Instant Win!", value: '[instantWin.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/instantWin.js)'},
            { name: "Invincibility", value: '[invincibility.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/invincibility.js)'},
            { name: "All Monsters Level 1", value: '[monstersLevel1.js ](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/monstersLevel1.js)'},
            { name: "One Shot Enemy", value: '[oneShotEnemy.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/oneShotEnemy.js)'},
            { name: "Skip Enemy Turn", value: '[skipEnemyTurn.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/skipEnemyTurn.js)'}
        )
        message.channel.send(embed);
    }

};