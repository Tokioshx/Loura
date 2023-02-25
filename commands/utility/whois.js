const { EmbedBuilder } = require('discord.js')
const moment = require('moment');

module.exports = {
  name: 'whois',
  aliases: ['wi','userinfo', 'ui'],
  run: async (client, message) => {
    let member = message.mentions.members.first() || message.member;
    var permissions = [];

    if(member.permissions.has('KickMembers')) {
      permissions.push('Kick Members');
    };
    
    if(member.permissions.has('BanMembers')) {
      permissions.push('Ban Members');
    };
    
    if(member.permissions.has('Administrator')) {
      permissions.push('Administrator');
    };

    if(member.permissions.has('ManageMessages')) {
      permissions.push('Manage Messages');
    };
    
    if(member.permissions.has('ManageChannels')) {
      permissions.push('Manage Channels');
    };
    
    if(member.permissions.has('MentionEveryone')) {
      permissions.push('Mention Everyone');
    };

    if(member.permissions.has('ManageNicknames')) {
      permissions.push('Manage Nicknames');
    };

    if(member.permissions.has('ManageRoles')) {
      permissions.push('Manage Roles');
    };

    if(member.permissions.has('ManageWebhooks')) {
      permissions.push('Manage Webhooks');
    };

    if(member.permissions.has('ManageEmojisAndStickers')) {
      permissions.push('Manage EMojis And Sticker');
    };

    if(member.permissions.has('ViewAuditLog')) {
      permissions.push('View Audit Log');
    };

    if(member.permissions.has('ManageGuild')) {
      permissions.push('Manage Server');
    };

    if(member.permissions.has('ModerateMembers')) {
      permissions.push('Timeout Members');
    };
  
    if(member.permissions.has('ManageThreads')) {
      permissions.push('Manage Threads');
    };
  
    if(member.permissions.has('ManageEvents')) {
      permissions.push('Manage Events');
    };

    if(member.permissions.has('MuteMembers')) {
      permissions.push('Mute Members Voice');
    };

    if(member.permissions.has('DeafenMembers')) {
      permissions.push('Deafen Member Voice');
    };

    if(member.permissions.has('MoveMembers')) {
      permissions.push('Move Member Voice');
    };

    if(permissions.length == 0){
      permissions.push('No Permission');
    };

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `Information about ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ forceStatic: true }) })
        .setColor('Navy')
        .setThumbnail(member.user.displayAvatarURL({ forceStatic: true, extension: 'png' }))
        .setFields(
          { name: '__Join Date:__', value: `${moment(member.joinedAt).format('dddd, MMMM Do YYYY')}` },
          { name: '__Create Date:__', value: `${moment(member.user.createdAt).format('dddd, MMMM Do YYYY')}` },
          { name: `__Role List [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`, value: `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(' **|** ') || 'None'}` },
          { name: '__Permissions Owned:__', value: `${permissions.join(` | `)}` }
        )
        .setFooter({ text: `ID: ${message.author.id}` })
        .setTimestamp()
      ]
    });
  },
};