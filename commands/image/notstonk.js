const { AttachmentBuilder } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'notstonk',
  run: async (client, message) => {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ forcestatic: false, extension: 'png' });
    message.channel.sendTyping();
    let img = await new DIG.NotStonk().getImage(avatar);
    let attach = new AttachmentBuilder(img).setName('notstonk.png');

    message.channel.send({
      files: [attach]
    });
  },
};