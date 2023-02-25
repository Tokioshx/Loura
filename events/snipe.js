const client = require('../index');
const { Events } = require('discord.js');

client.on(Events.MessageDelete, async (message) => {
  if(!message.author || message.author.bot) return;
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    time: Math.round(Date.now()),
    avatar: message.author.displayAvatarURL({ forceStatic: true, extension: 'png' }),
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  });
});