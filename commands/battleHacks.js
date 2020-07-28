const { description } = require("./ping");
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'battle',
    description: 'Battle hacks',
    execute(message, args){
        let embed = new MessageEmbed()
        .setColor('#ff9100')
        .addField("Battle Losses", '[battleLosses.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/battleLoses.js)', true)
        .addField("Boss Difficulty", '[bossDifficulty.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/bossDifficulty.js)', true)
        .addField("Escape Battle",  '[escapeBattle.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/escapeBattle.js)', true)
        .addField("Free Catches!",  '[freeCatches.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/freeCatches.js)', true)
        .addFeild("Heal Team",  '[healTeam.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/healTeam.js)', true)
        .addField("Immortal",  '[immortal.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/immortal.js)', true)
        .addField("Infinite Catch Attempts",  '[infiniteCatchAttempts.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/infiniteCatchAttempts.js)', true)
        .addField("Instant Win!",  '[instantWin.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/instantWin.js)', true)
        .addField("Invincibility",  '[invincibility.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/invincibility.js)', true)
        .addField("All Monsters Level 1",  '[monstersLevel1.js ](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/monstersLevel1.js)', true)
        .addField("One Shot Enemy",  '[oneShotEnemy.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/oneShotEnemy.js)', true)
        .addField("Skip Enemy Turn",  '[skipEnemyTurn.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/skipEnemyTurn.js)', true)
        message.channel.send(embed);
    }

};