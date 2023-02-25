const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'clear',
  aliases: ['purge'],
  run: async (client, message, args) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("You don't have the privilege to use this command!")
        ]
      });
    };

    let totalClear = args[0];
    if(!totalClear) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please specific how much message do you want to delete')
        ]
      });
    } else if(totalClear < 1 || totalClear > 100) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('The amount of message that you can delete is at least 1 - 100')
        ]
      });
    } else if(isNaN(totalClear)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please input a valid number not a string or symbol')
        ]
      });
    };

    let end = Number(totalClear) + 1;
    let endMessage = `${message.author} just deleted ${totalClear} ${(totalClear <= 1) ? 'message' : 'messages'} in this channel`;

    await message.channel.bulkDelete(end).then(() => {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${endMessage}`)
        ]
      }).then((msg) => {
        setTimeout(function() {
          msg.delete();
        }, 4000);
      });
    }).catch(() => {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like I can't delete the message, make sure the age from that message is less than 2 weeks!")
        ]
      });
    });
  },
};