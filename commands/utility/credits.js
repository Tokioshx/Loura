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
        .setThumbnail('https://cdn.discordapp.com/avatars/1010474132753883207/96e6213a62bf507ea3148c9cc2ac0121.png?size=4096')
        .setDescription(`Bot Idea: \`Tokioshy\`\nBeta Tester: \`Tokioshy\`\nHandler Source: \`Reconlx\`\nDeveloper: \`Tokioshy\`\nDesigner: \`Tokioshy\`\nHosting: \`Octavstore\`\nSupporter: \`Cloynn_\``)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
        .setTimestamp()
      ]
    });
  },
};