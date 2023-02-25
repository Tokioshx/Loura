const { AttachmentBuilder } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'sepia',
  run: async (client, message) => {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ forcestatic: false, extension: 'png', size: 4096 });
    message.channel.sendTyping();
    let img = await new DIG.Sepia().getImage(avatar);
    let attach = new AttachmentBuilder(img).setName('sepia.png');

    message.channel.send({
      files: [attach]
    });
  },
};