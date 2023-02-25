const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'unhide',
  aliases: [],
  run: async (client, message) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("You don't have the privilege to use this command!")
        ]
      });
    };

    if(message.channel.permissionsFor(message.guild.id).has(PermissionsBitField.Flags.ViewChannel)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like this channel not hided yet.")
        ]
      });
    };

    await message.channel.permissionOverwrites.edit(message.guild.id, { ViewChannel: null }, { reason: `Unhided by ${message.author.tag}` }).then(() => {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${message.author} just unhide this channel from everyone`)
        ]
      });
    });
  },
};