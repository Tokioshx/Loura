const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'delnote',
  aliases: [],
  run: async (client, message) => {
    let data = await db.get(`notes_${message.author.id}`);
    if(!data) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like you isn't set any notes yet.")
        ]
      })
    }

    await db.delete(`notes_${message.author.id}`);
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Green')
        .setDescription('Successfully delete your note from database!')
      ]
    });
  },
};