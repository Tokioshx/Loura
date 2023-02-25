const client = require('../index');
const { Events } = require('discord.js');

client.on(Events.ClientReady, () => 
  console.log(`${client.user.tag} is up and ready to go!`)
);