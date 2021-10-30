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

    const guild_id = '903865095988338750';
    const guild = client.guilds.cache.get(guild_id);
    let commands

    if(guild) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'ping',
        description: 'Replys with pong',
    })

    commands?.create({
        name: 'add',
        description: 'Adds two numbers.',
        options: [
            {
                name: 'num1',
                description: 'The first number.',
                required: true,
                type: discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'The second number.',
                required: true,
                type: discord.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    })

})

client.on('interactionCreate', async (interaction) => {

    if(!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if(commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true
        })
    } else if(commandName === 'add') {

        const num1 = options.getNumber('num1')!;
        const num2 = options.getNumber('num2')!;

        await interaction.deferReply({
            ephemeral: true,
        })

        await new Promise(resolve => setTimeout(resolve, 5000))

        interaction.editReply({
            content: `The sum is ${num1 + num2}`,
        })
    }

})

client.login(process.env.TOKEN)