const { AttachmentBuilder } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'jail',
  run: async (client, message) => {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ forcestatic: false, extension: 'png', size: 4096 });
    message.channel.sendTyping();
    let img = await new DIG.Jail().getImage(avatar);
    let attach = new AttachmentBuilder(img).setName('jail.png');

    message.channel.send({
      files: [attach]
    });
  },
};