const { EmbedBuilder } = require('discord.js');
const API = require('nekos.life');
const neko = new API();

module.exports = {
  name: 'wallpaper',
  aliases: [],
  run: async (client, message) => {
    if(!message.channel.nsfw) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Sorry but this command now only work in **NSFW** channel, sometimes it will show a nsfw wallpaper.")
        ]
      })
    }

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setTitle('New wallpaper? 😍')
        .setColor('Navy')
        .setImage((await neko.wallpaper()).url)
      ]
    });
  },
};