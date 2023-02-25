const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'snipe',
  aliases: [],
  run: async (client, message, args) => {
    let msg = client.snipes.get(message.channel.id);
    if(!msg) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like there's no message deleted in this channel")
        ]
      });
    };

    let results = new EmbedBuilder()
    .setColor('Navy')
    .setFooter({ text: `Owner ${msg.author} | ${moment(msg.time).calendar()}` });

    if(msg.content) {
      results.setAuthor({ name: 'Last message deleted in this channel' })
      results.setThumbnail(`${msg.avatar}`)
      results.setDescription(`${msg.content}`);
    };

    if(msg.image) {
      results.setAuthor({ name: 'Last image deleted in this channel' })
      results.setImage(`${msg.image}`)
    };

    message.channel.send({ embeds: [results] });
  },
};