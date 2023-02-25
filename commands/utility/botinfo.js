const { EmbedBuilder, version: discordjsVersion } = require ('discord.js');
const ms = require('pretty-ms');

module.exports = {
  name: 'botinfo',
  aliases: ['bi'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setTitle(`Information about ${client.user.username}!`)
        .setFields(
          { name: '**Uptime:**', value: `${ms(client.uptime)}` },
          { name: '**Bot Speed:**', value: `${client.ws.ping}ms` },
          { name: '**Total Server:**', value: `${client.guilds.cache.size} ${(client.guilds.cache.size <= 1) ? 'Server' : 'Servers'}.` },
          { name: '**Total user:**', value: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).toLocaleString()} users.` },
          { name: '**Total Command:**', value: `${client.commands.size} Commands.` },
          { name: '**DJS Version:**', value: `${discordjsVersion}` }
        )
        .setThumbnail(client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }))
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
        .setTimestamp()
      ]
    });
  },
};