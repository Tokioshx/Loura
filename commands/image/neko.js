const { EmbedBuilder } = require('discord.js');
const API = require('nekos.life');
const neko = new API();

module.exports = {
  name: 'neko',
  aliases: [],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setTitle('Neko nya-nya-nya! 😼')
        .setColor('Navy')
        .setImage((await neko.neko()).url)
        .setFooter({ text: 'Neko' })
        .setTimestamp()
      ]
    });
  },
};