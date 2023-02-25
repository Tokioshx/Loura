const { EmbedBuilder } = require('discord.js');
const API = require('nekos.life');
const neko = new API();

module.exports = {
  name: 'slap',
  aliases: [],
  run: async (client, message) => {
    let member = message.mentions.users.first() || client.user;

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setDescription(`🖐 **${message.author.username}** slaps **${member.username}**`)
        .setColor('Navy')
        .setImage((await neko.slap()).url)
        .setFooter({ text: 'Slap' })
        .setTimestamp()
      ]
    });
  },
};