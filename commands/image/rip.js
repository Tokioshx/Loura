const { AttachmentBuilder } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'rip',
  run: async (client, message) => {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ forcestatic: false, extension: 'png' });
    message.channel.sendTyping();
    let img = await new DIG.Rip().getImage(avatar);
    let attach = new AttachmentBuilder(img).setName('rip.png');

    message.channel.send({
      files: [attach]
    });
  },
};