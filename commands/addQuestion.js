module.exports = {
    name: "addquestion",
    description: "Creates a FAQ Q&A",
    execute(message, args){
        message.channel.send('Please type your question!')
        message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 60000000 }).then(collected => {
        console.log(collected.first().content)
        // The collected.first().content is the first thing the sender of the initial message chats
        // The time: 60000000  represents that it won't collect data after 60 seconds
        })
        message.channel.send('Please type your answer!')
        message.channel.awaitMessages(m => m.author.id == message.author.id,
            { max: 1, time: 60000000 }).then(collected => {
        console.log(collected.first().content)
            // The collected.first().content is the first thing the sender of the initial message chats
            // The time: 60000000  represents that it won't collect data after 60 seconds
        })
    }   
};
