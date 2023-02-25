const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'kick',
  alises: [],
  run: async (client, message, args) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("You don't have the privilege to use this command!")
        ]
      });
    };

    let member = message.mentions.members.first();
    if(!member) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please mention someone to kick from the server!')
        ]
      });
    } else if(member.id === message.author.id) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please mention someone not yourself!')
        ]
      });
    };

    if(!member.kickable) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like I can't kick them.")
        ]
      });
    };

    let reason = args.slice(1).join(' ') || 'No reason given';

    member.kick(`Kicked by ${message.author.tag} with reason: ${reason}`).then(() => {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${message.author} just kick \`${member.user.tag}\` with reason: ${reason}`)
        ]
      });
    });
  },
};