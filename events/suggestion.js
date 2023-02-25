const client = require('../index');
const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

client.on(Events.InteractionCreate, async (interaction) => {
  if(interaction.isButton()) {
    if(interaction.customId == 'suggestion') {
      let modal = new ModalBuilder()
      .setCustomId('results')
      .setTitle('Suggestion Form Application')
      
      let suggest = new TextInputBuilder()
      .setCustomId('suggestion')
      .setLabel('Insert your suggestion here')
      .setPlaceholder('I want a...')
      .setMinLength(10)
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

      let row = new ActionRowBuilder().addComponents(suggest);
      modal.addComponents(row);

      interaction.showModal(modal);
    };
  };

  if(interaction.isModalSubmit()) {
    if(interaction.customId == 'results') {
      let suggest = interaction.fields.getTextInputValue('suggestion');
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Navy')
          .setDescription(`Successfully send your suggestion to vote room! Check it out at <#1071271819228741642>`)
        ],
        ephemeral: true
      });

      client.channels.cache.get('1071271819228741642').send({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `New suggestion from ${interaction.user.username}!`, iconURL: interaction.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
          .setColor('Navy')
          .setDescription(`${suggest}`)
          .setFooter({ text: 'Vote the suggestion with reaction' })
          .setTimestamp()
        ]
      }).then(async (msg) => {
        await msg.react('⬆');
        await msg.react('⬇');
        await msg.startThread({
          name: `${interaction.user.username}'s suggestion`,
          autoArchiveDuration: 10080,
          reason: 'To discuss user suggestion'
        });
      });
    };
  };
});