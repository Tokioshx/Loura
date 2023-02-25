const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'warn',
  aliases: [],
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
          .setDescription('Please mention someone to warn!')
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

    let reason = args.slice(1).join(' ') || 'No reason given';

    await db.add(`warning_${member.user.id}, ${message.guild.id}`, 1);
    await db.set(`warningReason_${member.user.id}, ${message.guild.id}`, reason);
    await db.set(`warningExecutor_${member.user.id}, ${message.guild.id}`, message.author.id);

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Green')
        .setDescription(`${member} just warned by ${message.author} with reason: ${reason}`)
      ]
    });
  },
};