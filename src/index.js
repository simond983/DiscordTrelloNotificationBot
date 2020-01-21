require('dotenv').config();
const { prefix } = require('./config.json');
const fs = require('fs');
const Discord = require("discord.js");


const client = new Discord.Client();
client.commands = new Discord.Collection();

//Get API key
const discord_token = process.env.DISCORD_ACCESS;

//read command files into a collection
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Startup message
client.once('ready', () => {
    console.log('Simon Trello Updates reporting for duty');
});

//Dynamic command functionality
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    //Get arguments after prefix
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

    //check if there is a command of that name in the collection
    if (!client.commands.has(commandName)) return;
    
    const command = client.commands.get(commandName);

    //execute command
	try 
	{
		command.execute(message, args);
	} 
	catch (error) 
	{
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(discord_token);