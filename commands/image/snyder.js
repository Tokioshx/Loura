const { AttachmentBuilder } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'snyder',
  run: async (client, message) => {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ forcestatic: false, extension: 'png' });
    message.channel.sendTyping();
    let img = await new DIG.Snyder().getImage(avatar);
    let attach = new AttachmentBuilder(img).setName('snyder.png');

    message.channel.send({
      files: [attach]
    });
  },
};