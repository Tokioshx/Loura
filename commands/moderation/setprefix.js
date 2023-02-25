const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'setprefix',
  aliases: [],
  run: async (client, message, args) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("You don't have the privilege to use this command!")
        ]
      });
    };

    let choosed = args[0];
    if(!choosed) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please include the new prefix to process!')
        ]
      });
    } else if(!isNaN(choosed)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Prefix are not supported to be a number!')
        ]
      });
    } else if(choosed.length > 5) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Prefix length must be 1 or 5, no more!')
        ]
      });
    };

    await db.set(`prefix_${message.guild.id}`, choosed);

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Green')
        .setDescription(`${message.author} just change my prefix to \`${choosed}\``)
      ]
    });
  },
};