const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'members',
  aliases: ['totalmember', 'member'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`${message.guild.members.cache.filter(member => !member.user.bot).size} Members\n${message.guild.members.cache.filter(member => member.user.bot).size} Bots\n${message.guild.members.cache.size} In total`)
        .setTimestamp()
      ]
    });
  },
};