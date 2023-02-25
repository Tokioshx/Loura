const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'avatar',
  aliases: ['av', 'pp', 'profile'],
  run: async (client, message) => {
    let member = message.mentions.users.first() || message.author;

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setTitle(`${member.tag} avatar`)
        .setColor('Navy')
        .setImage(member.displayAvatarURL({ forceStatic: true, extension: 'png', size: 4096 }))
      ]
    });
  },
};