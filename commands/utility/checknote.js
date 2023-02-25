const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'checknote',
  aliases: [],
  run: async (client, message) => {
    let notes = await db.get(`notes_${message.author.id}`);
    if(!notes) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like you isn't set any notes yet.")
        ]
      });
    };

    let output = '';
    notes.forEach((note, index) => {
      output += `${index + 1}. ${note}\n`;
    });

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `${message.author.username} notes`, iconURL: message.author.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
        .setColor('Navy')
        .setDescription(output)
        .setFooter({ text: "Notes" })
        .setTimestamp()
      ]
    });
  },
};