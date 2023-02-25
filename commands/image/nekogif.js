const { EmbedBuilder } = require('discord.js');
const API = require('nekos.life');
const neko = new API();

module.exports = {
  name: 'nekogif',
  aliases: [],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setTitle('Neko nya-nya-nya! 😼')
        .setColor('Navy')
        .setImage((await neko.nekoGif()).url)
        .setFooter({ text: 'Neko Gif' })
        .setTimestamp()
      ]
    });
  },
};