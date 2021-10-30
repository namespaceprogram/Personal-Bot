import discord, { Intents } from 'discord.js'
import env from 'dotenv'
env.config()

const client = new discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log("The bot is ready.");
})

client.on('messageCreate', (message) => {
    if(message.content === 'ping') {
        message.reply({
            content: 'pong'
        })
    }
})

client.login(process.env.TOKEN)