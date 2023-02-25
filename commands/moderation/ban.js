const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ban',
  alises: [],
  run: async (client, message, args) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
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
          .setDescription('Please mention someone to ban from the server!')
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

    if(!member.bannable) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like I can't ban them.")
        ]
      });
    };

    let reason = args.slice(1).join(' ') || 'No reason given';

    member.ban(`Banned by ${message.author.tag} with reason: ${reason}`).then(() => {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${message.author} just banned \`${member.user.tag}\` with reason: ${reason}`)
        ]
      });
    });
  },
};