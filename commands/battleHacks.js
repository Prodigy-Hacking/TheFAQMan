const { description } = require("./ping");

module.exports = {
    name: 'Battle',
    description: 'Battle hacks',
    execute(message, args){
        let embed = new MessageEmbed
        .setHeader('Battle Hacks')
        .setColor('#ff9100')
        .addFeilds(
            { name: "", value: '[battleLosses.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/battleLoses.js)'},
            { name: "", value: '[bossDifficulty.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/bossDifficulty.js)'},
            { name: "", value: '[escapeBattle.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/escapeBattle.js)'},
            { name: "", value: '[freeCatches.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/freeCatches.js)'},
            { name: "", value: '[healTeam.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/healTeam.js)'},
            { name: "", value: '[immortal.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/immortal.js)'},
            { name: "", value: '[infiniteCatchAttempts.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/infiniteCatchAttempts.js)'},
            { name: "", value: '[instantWin.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/instantWin.js)'},
            { name: "", value: '[invincibility.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/invincibility.js)'},
            { name: "", value: '[monstersLevel1.js ](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/monstersLevel1.js)'},
            { name: "", value: '[oneShotEnemy.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/oneShotEnemy.js)'},
            { name: "", value: '[skipEnemyTurn.js](https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/hacks/Battle/skipEnemyTurn.js)'},


        )

    }

}