const { EmbedBuilder } = require('discord.js');
const API = require('nekos.life');
const neko = new API();

module.exports = {
  name: 'gecg',
  aliases: [],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setTitle('Genetically Engineered Catgirl? 🤔')
        .setColor('Navy')
        .setImage((await neko.gecg()).url)
        .setFooter({ text: 'GECG' })
        .setTimestamp()
      ]
    });
  },
};