const { EmbedBuilder, ChannelType } = require('discord.js');
const moment = require('moment')

module.exports = {
  name: 'serverinfo',
  aliases: ['si'],
  run: async (client, message) => {
    let owner = await message.guild.fetchOwner();

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setTitle(`Information about ${message.guild.name}`)
        .setFields(
          { name: '**__Server Owner:__**', value: `${owner.user.tag}` },
          { name: '**__Create Date:__**', value: `${moment(message.guild.createdTimestamp).format('LL')} | ${moment(message.guild.createdTimestamp).fromNow()}`},
          { name: '**__Total Channel:__**', value: `${message.guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size} Text Channel\n${message.guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size} Voice Channel\n${message.guild.channels.cache.size} Total Channel`},
          { name: '**__Total Member:__**', value: `${message.guild.members.cache.filter(member => !member.user.bot).size} Member\n${message.guild.members.cache.filter(member => member.user.bot).size} Bot\n${message.guild.members.cache.size} Total Member` },
          { name: '**__Total Roles:__**', value: `${message.guild.roles.cache.size} roles` }
        )
        .setThumbnail(message.guild.iconURL({ forceStatic: true }))
        .setFooter({ text: `ID: ${message.guild.id}` })
        .setTimestamp()
      ]
    });
  },
};