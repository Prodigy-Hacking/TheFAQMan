const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Ping tester',
    execute(message, args){
        var ping = Date.now() -message.createdTimestamp + " ms";
        let embed = new MessageEmbed()
        .setColor('#ff9100')
        .addField('Pong!', ping, true)
        message.channel.send(embed);
    }

};