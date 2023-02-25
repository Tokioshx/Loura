const { AttachmentBuilder } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'clown',
  run: async (client, message) => {
    let member = message.mentions.users.first() || message.author;

    let avatar = member.displayAvatarURL({ forcestatic: false, extension: 'png' });
    message.channel.sendTyping();
    let img = await new DIG.Clown().getImage(avatar);
    let attach = new AttachmentBuilder(img).setName('clown.png');

    message.channel.send({
      files: [attach]
    });
  },
};