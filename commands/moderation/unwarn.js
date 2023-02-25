const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'unwarn',
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

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please mention someone to unwarn!')
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

    let loadWarning = await db.get(`warning_${member.user.id}, ${message.guild.id}`);
    if(!loadWarning || loadWarning == 0) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("That user doesn't have a warning!")
        ]
      });
    };

    await db.sub(`warning_${member.user.id}, ${message.guild.id}`, 1);
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Green')
        .setDescription(`${message.author} just unwarn ${member}, now they have ${loadWarning - 1} warning(s)`)
      ]
    });
  },
};