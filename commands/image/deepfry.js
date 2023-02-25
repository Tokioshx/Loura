const { AttachmentBuilder } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'deepfry',
  run: async (client, message) => {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ forcestatic: false, extension: 'png', size: 4096 });
    message.channel.sendTyping();
    let img = await new DIG.Deepfry().getImage(avatar);
    let attach = new AttachmentBuilder(img).setName('deepfry.png');

    message.channel.send({
      files: [attach]
    });
  },
};