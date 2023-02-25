const { AttachmentBuilder } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'trash',
  run: async (client, message) => {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ forcestatic: false, extension: 'png' });
    message.channel.sendTyping();
    let img = await new DIG.Trash().getImage(avatar);
    let attach = new AttachmentBuilder(img).setName('trash.png');

    message.channel.send({
      files: [attach]
    });
  },
};