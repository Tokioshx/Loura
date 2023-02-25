const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'resetwarn',
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

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Please mention someone to reset their warn!')
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

    let loadWarning = await db.get(`warning_${member.user.id}, ${message.guild.id}`);
    if(!loadWarning || loadWarning == 0) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("That user doesn't have a warning!")
        ]
      });
    };

    let msg = await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setDescription(`That user have \`${loadWarning}\` warnings, are you sure want to reset their warning?`)
      ],
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId('yes')
          .setLabel("Yes I'm sure")
          .setStyle('Success'),
          new ButtonBuilder()
          .setCustomId('no')
          .setLabel('Nervermind')
          .setStyle('Danger')
        )
      ]
    });

    let collector = await msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 180000 });
    collector.on('collect', async (interaction) => {
      if(interaction.customId === 'yes') {
        if(interaction.user.id !== message.author.id) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Red')
              .setDescription('This is not your own button!')
            ],
            ephemeral: true
          });
        };
        await db.delete(`warning_${member.user.id}, ${message.guild.id}`);
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setColor('Green')
            .setDescription(`${member} warnings has been reset by ${message.author}`)
          ],
          components: []
        });
      };

      if(interaction.customId === 'no') {
        if(interaction.user.id !== message.author.id) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Red')
              .setDescription('This is not your own button!')
            ],
            ephemeral: true
          });
        };
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setColor('Green')
            .setDescription('Successfully canceled the task')
          ],
          components: []
        });
      };
    });

    collector.on('end', async (collected) => {
      if(collected.size === 0) {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription("You doesn't click any button for 3 minutes, the task has been canceled.")
          ],
          components: []
        });
      };
    });
  },
};