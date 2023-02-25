const client = require('../index');
const { Events } = require('discord.js');

client.on(Events.GuildMemberAdd, async (member) => {
  if(member.guild.id === client.config.serverId) {
    if(!member.user.bot) {
      member.roles.add('1041331344388653077');
    };
  };
});