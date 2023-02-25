const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'setmuterole',
  aliases: [],
  run: async (client, message) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("You don't have the privilege to use this command!")
        ]
      });
    };

    let rolePicked = message.mentions.roles.first();
    if(!rolePicked) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please mention the mute role!')
        ]
      });
    };

    await db.set(`muteRole_${message.guild.id}`, rolePicked.id);
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Green')
        .setDescription(`${message.author} just set mute role for this server to ${rolePicked}`)
      ]
    });
  },
};