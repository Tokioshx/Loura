const client = require('../index');
const { Events, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

client.on(Events.MessageCreate, async (message) => {
  if(message.author.bot || !message.guild || message.content.includes('@here') || message.content.includes('@everyone') || message.type == 19 || message.mentions.roles.first()) return;
  
  if(message.mentions.has(client.user)) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`Hello ${message.author.username}! Good to see you mention me, if you forget my prefix or want to know what my prefix in this server, my prefix is \`${await db.get(`prefix_${message.guild.id}`) ? await db.get(`prefix_${message.guild.id}`) : client.config.prefix}\`. You can use \`${await db.get(`prefix_${message.guild.id}`) ? await db.get(`prefix_${message.guild.id}`) : client.config.prefix}help\` to see command list!`)
      ]
    });
  };
});