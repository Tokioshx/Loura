const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
  ],
  disableMentions: 'everyone'
});

client.commands = new Collection();
client.snipes = new Collection();
client.config = require('./handler/config');

require('./handler')(client);
require('dotenv').config();

client.login(process.env.token);
module.exports = client;