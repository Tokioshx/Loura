const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'monster',
  run: async (client, message) => {
    let member = message.mentions.users.first();
    if(!member) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Mention someone if you scare to them!')
        ]
      });
    } else if(member.id === message.author.id) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please mention someone not yourself!')
        ]
      });
    };

    let firstAvatar = message.author.displayAvatarURL({ forcestatic: false, extension: 'png' });
    let secondAvatar = member.displayAvatarURL({ forcestatic: false, extension: 'png' });
    message.channel.sendTyping();
    let img = await new DIG.Bed().getImage(firstAvatar, secondAvatar);
    let attach = new AttachmentBuilder(img).setName('monster.png');

    message.channel.send({
      files: [attach]
    });
  },
};