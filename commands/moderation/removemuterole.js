const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'removemuterole',
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

    let loadRole = await db.get(`muteRole_${message.guild.id}`);
    if(!loadRole) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription("Looks like this server doesn't set any mute role yet.")
        ]
      });
    };

    let msg = await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setDescription(`Are you sure want to delete mute role from database? Current mute role is <@&${loadRole}>`)
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
        await db.delete(`muteRole_${message.guild.id}`);
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setColor('Green')
            .setDescription(`${message.author} just deleted the muted role from my database for this server.`)
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