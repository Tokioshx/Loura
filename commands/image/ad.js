const { AttachmentBuilder } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'ad',
  run: async (client, message) => {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ forcestatic: false, extension: 'png' });
    message.channel.sendTyping();
    let img = await new DIG.Ad().getImage(avatar);
    let attach = new AttachmentBuilder(img).setName('ad.png');

    message.channel.send({
      files: [attach]
    });
  },
};