const Discord = require("discord.js");
require('dotenv').config();
const bot = new Discord.Client();

const token = process.env.DISCORD_ACCESS;

bot.on('ready', () => {
    console.log('Simon Trello Updates reporting for duty');
})

bot.login(token);