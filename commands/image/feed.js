const { EmbedBuilder } = require('discord.js');
const API = require('nekos.life');
const neko = new API();

module.exports = {
  name: 'feed',
  aliases: [],
  run: async (client, message) => {
    let member = message.mentions.users.first() || client.user;
    
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setDescription(`🍖 **${message.author.username}** feeds **${member.username}**`)
        .setColor('Navy')
        .setImage((await neko.feed()).url)
        .setFooter({ text: 'Feed' })
        .setTimestamp()
      ]
    });
  },
};