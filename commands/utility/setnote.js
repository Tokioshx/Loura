const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'setnote',
  aliases: [],
  run: async (client, message, args) => {
    let prefix = await db.get(`prefix_${message.guild.id}`) || client.config.prefix;
    let value = args.join(' ');
    if(!value) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Input something to set a note for yourself')
        ]
      });
    } else if(value.length > 300) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("I'm sorry but you only can make a note with 300 length of characters!")
        ]
      });
    };

    await db.push(`notes_${message.author.id}`, value);
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Green')
        .setDescription(`Successfully create your own note!, use \`${prefix}checknote\` to see your own note!`)
      ]
    });
  },
};