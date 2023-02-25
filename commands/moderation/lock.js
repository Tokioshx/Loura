const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'lock',
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

    if(!message.channel.permissionsFor(message.guild.id).has(PermissionsBitField.Flags.SendMessages)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like this channel already locked.")
        ]
      });
    };

    await message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: false }, { reason: `Locked by ${message.author.tag}` }).then(() => {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${message.author} just lock this channel from everyone`)
        ]
      });
    });
  },
};