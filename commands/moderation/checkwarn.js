const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = { 
  name: 'checkwarn',
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
          .setDescription('Please mention someone to check their warn!')
        ]
      });
    };

    let loadWarning = await db.get(`warning_${member.user.id}, ${message.guild.id}`);
    if(!loadWarning) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("That user doesn't have a warning!")
        ]
      });
    };

    totalWarn = await db.get(`warning_${member.user.id}, ${message.guild.id}`);
    warnReason = await db.get(`warningReason_${member.user.id}, ${message.guild.id}`);
    warnExecutor = await db.get(`warningExecutor_${member.user.id}, ${message.guild.id}`);

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('DarkGrey')
        .setTitle(`${member.user.tag} warning information`)
        .setThumbnail(member.user.displayAvatarURL({ forceStatic: true, extensions: 'png' }))
        .setDescription(`Total warning: \`${totalWarn}\`\nLast Reason: \`${warnReason}\`\nModerator: <@${warnExecutor}>`)
        .setFooter({ text: `Requested by ${message.author.tag}` })
        .setTimestamp()
      ]
    });
  },
};