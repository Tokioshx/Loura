const client = require('../../index');
const { Events, ActivityType } = require('discord.js');

client.on(Events.ClientReady, () => {
  console.log(`${client.user.tag} is up and ready to go!`);
  client.user.setActivity(`Hello World!`, { type: ActivityType.Listening });
});