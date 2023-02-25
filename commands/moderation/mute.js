const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'mute',
  aliases: [],
  run: async (client, message, args) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("You don't have the privilege to use this command!")
        ]
      });
    };

    let loadRole = await db.get(`muteRole_${message.guild.id}`);
    if(!loadRole) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like this server doesn't set any mute role yet.")
        ]
      });
    };

    let member = message.mentions.members.first();
    if(!member) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please mention someone to mute them!')
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

    if(member.roles.cache.has(loadRole)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Looks like that member already have a muted role.')
        ]
      });
    };

    let reason = args.slice(1).join(' ') || 'No reason given';

    await member.roles.add(loadRole).then(() => {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${message.author} just muted ${member} with reason: ${reason}`)
        ]
      });
    });
  },
};