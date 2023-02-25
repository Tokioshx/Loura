const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'credits',
  aliases: [],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setAuthor({ name: `Credits of ${client.user.username}`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
        .setThumbnail(`${client.users.cache.get('1010474132753883207').displayAvatarURL({ forceStatic: true, extension: 'png' })}`)
        .setDescription(`Bot Idea: \`Tokioshy\`\nBeta Tester: \`Tokioshy\`\nHandler Source: \`Reconlx\`\nDeveloper: \`Tokioshy\`\nDesigner: \`Tokioshy\`\nHosting: \`Octavstore\`\nSupporter: \`Cloynn_\``)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
        .setTimestamp()
      ]
    });
  },
};