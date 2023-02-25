const { EmbedBuilder } = require('discord.js');
const weather = require('weather-js');

module.exports = {
  name: 'weather',
  aliases: [],  
  run: async (client, message, args) => {
    if(!args[0]) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Provide a city to see the weather')
        ]
      });
    };

    weather.find({ search: args.join(' '), degreeType: 'C'}, function(err, result) {
      if(err) return;
      if(result.length === 0) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription("Looks like I can't find any city with that keyword")
          ]
        });
      };

      var current = result[0].current;
      var location = result[0].location;

      message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setDescription(`**${current.skytext}**`)
          .setAuthor({ name: `Weather for ${current.observationpoint}` })
          .setThumbnail(current.imageUrl)
          .setColor('Navy')
          .setFields(
            { name: '**Timezone**', value: `UTC ${location.timezone}` },
            { name: '**Temperature**', value: `${current.temperature} Celcius` },
            { name: '**Wind Display**', value: `${current.winddisplay}`},
            { name: '**Humidity**', value: `${current.humidity}%` },
            { name: '**Date**', value: `${current.date}` },
            { name: '**Day**', value: `${current.day}` }
          )
        ]
      });
    });
  },
};