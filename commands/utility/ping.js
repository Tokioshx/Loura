const { EmbedBuilder } = require('discord.js');
const ms = require('pretty-ms');

module.exports = {
  name: 'ping',
  aliases: [],
  run: async (client, message) => {
    let msg = await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setDescription('Loading for bot ping...')
      ]
    });

    msg.edit({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`Latency ping is \`${ms((msg.createdTimestamp - message.createdTimestamp))}\`\nAPI latency is \`${Math.round(client.ws.ping)}ms\`\nShard server is \`${ms(message.guild.shard.id)}\``)
      ]
    });
  },
};