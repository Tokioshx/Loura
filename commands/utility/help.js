const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: 'help',
  aliases: ['h'],
  run: async (client, message) => {
    let prefix = await db.get(`prefix_${message.guild.id}`) || client.config.prefix;

    let msg = await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `${client.user.username} Commands List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
        .setColor('Navy')
        .setImage('https://cdn.discordapp.com/attachments/1049567647097950248/1068092536536707082/standard.gif')
        .setDescription(`Total command that I have now is \`${client.commands.size}\`\nCurrent prefix in **${message.guild.name}** is \`${prefix}\`\nClick the button to see commands!\n\n**Command Categories**\n🖼・\`Image\`\n⛔・\`Moderation\`\n⚙・\`Utility\`\n\n_If you **need help** or **have trouble** using any **command** or **find a bug**, you can also join our [**Bot Support**](https://discord.gg/tMMgdGNcP3) Discord Server._`)
      ],
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId('leftToUtility')
          .setEmoji('⬅')
          .setStyle('Success'),
          new ButtonBuilder()
          .setCustomId('homeButton')
          .setEmoji('🏠')
          .setStyle('Primary'),
          new ButtonBuilder()
          .setCustomId('deleteButton')
          .setEmoji('🔥')
          .setStyle('Secondary'),
          new ButtonBuilder()
          .setCustomId('rightToImage')
          .setEmoji('➡')
          .setStyle('Success')
        )
      ]
    });
    
    let collector = await msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 180000 });
    collector.on('collect', async (interaction) => {
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

      interaction.deferUpdate();
      if(interaction.customId === 'homeButton') {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Commands List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setImage('https://cdn.discordapp.com/attachments/1049567647097950248/1068092536536707082/standard.gif')
            .setDescription(`Total command that I have now is \`${client.commands.size}\`\nCurrent prefix in **${message.guild.name}** is \`${prefix}\`\nClick the button to see commands!\n\n**Command Categories**\n🖼・\`Image\`\n⛔・\`Moderation\`\n⚙・\`Utility\`\n\n_If you **need help** or **have trouble** using any **command** or **find a bug**, you can also join our [**Bot Support**](https://discord.gg/tMMgdGNcP3) Discord Server._`)
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('leftToUtility')
              .setEmoji('⬅')
              .setStyle('Success'),
              new ButtonBuilder()
              .setCustomId('homeButton')
              .setEmoji('🏠')
              .setStyle('Primary'),
              new ButtonBuilder()
              .setCustomId('deleteButton')
              .setEmoji('🔥')
              .setStyle('Secondary'),
              new ButtonBuilder()
              .setCustomId('rightToImage')
              .setEmoji('➡')
              .setStyle('Success')
            )
          ]
        });
      };

      if(interaction.customId === 'deleteButton') {
        msg.delete();
      };

      if(interaction.customId === 'rightToImage') {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Commands List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setImage('https://cdn.discordapp.com/attachments/1049567647097950248/1068092536536707082/standard.gif')
            .setDescription(`Total command that I have now is \`${client.commands.size}\`\nCurrent prefix in **${message.guild.name}** is \`${prefix}\`\nClick the button to see commands!\n\n**Image Commands**\`\`\`yaml\nad, affect, beautiful, blur, clown, cuddle, deepfry, delete, feed, gay, gecg, grey, hug, invert, jail, kiss, mirror, monster, neko, nekogif, notstonk, pat, rip, sepia, slap, snyder, stonk, trash, triggered, wallpaper, wanted\`\`\`\n_If you **need help** or **have trouble** using any **command** or **find a bug**, you can also join our [**Bot Support**](https://discord.gg/tMMgdGNcP3) Discord Server._`)
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('leftToHome')
              .setEmoji('⬅')
              .setStyle('Success'),
              new ButtonBuilder()
              .setCustomId('homeButton')
              .setEmoji('🏠')
              .setStyle('Primary'),
              new ButtonBuilder()
              .setCustomId('deleteButton')
              .setEmoji('🔥')
              .setStyle('Secondary'),
              new ButtonBuilder()
              .setCustomId('rightToModeration')
              .setEmoji('➡')
              .setStyle('Success')
            )
          ]
        });
      };

      if(interaction.customId === 'rightToModeration') {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Commands List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setImage('https://cdn.discordapp.com/attachments/1049567647097950248/1068092536536707082/standard.gif')
            .setDescription(`Total command that I have now is \`${client.commands.size}\`\nCurrent prefix in **${message.guild.name}** is \`${prefix}\`\nClick the button to see commands!\n\n**Moderation Commands**\`\`\`yaml\nban, checkwarn, clear, hide, kick, lock, mute, removemuterole, resetwarn, setmuterole, setprefix, unhide, unlock, unmute, unwarn, warn\`\`\`\n_If you **need help** or **have trouble** using any **command** or **find a bug**, you can also join our [**Bot Support**](https://discord.gg/tMMgdGNcP3) Discord Server._`)
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('leftToImage')
              .setEmoji('⬅')
              .setStyle('Success'),
              new ButtonBuilder()
              .setCustomId('homeButton')
              .setEmoji('🏠')
              .setStyle('Primary'),
              new ButtonBuilder()
              .setCustomId('deleteButton')
              .setEmoji('🔥')
              .setStyle('Secondary'),
              new ButtonBuilder()
              .setCustomId('rightToUtility')
              .setEmoji('➡')
              .setStyle('Success')
            )
          ]
        });
      };

      if(interaction.customId === 'rightToUtility') {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Commands List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setImage('https://cdn.discordapp.com/attachments/1049567647097950248/1068092536536707082/standard.gif')
            .setDescription(`Total command that I have now is \`${client.commands.size}\`\nCurrent prefix in **${message.guild.name}** is \`${prefix}\`\nClick the button to see commands!\n\n**Utility Commands**\`\`\`yaml\navatar, botinfo, checknote, credits, delnote, evaluation, help, members, ping, serverinfo, setnote, snipe, weather, whois\`\`\`\n_If you **need help** or **have trouble** using any **command** or **find a bug**, you can also join our [**Bot Support**](https://discord.gg/tMMgdGNcP3) Discord Server._`)
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('leftToModeration')
              .setEmoji('⬅')
              .setStyle('Success'),
              new ButtonBuilder()
              .setCustomId('homeButton')
              .setEmoji('🏠')
              .setStyle('Primary'),
              new ButtonBuilder()
              .setCustomId('deleteButton')
              .setEmoji('🔥')
              .setStyle('Secondary'),
              new ButtonBuilder()
              .setCustomId('rightToHome')
              .setEmoji('➡')
              .setStyle('Success')
            )
          ]
        });
      };

      if(interaction.customId === 'leftToHome') {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Commands List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setImage('https://cdn.discordapp.com/attachments/1049567647097950248/1068092536536707082/standard.gif')
            .setDescription(`Total command that I have now is \`${client.commands.size}\`\nCurrent prefix in **${message.guild.name}** is \`${prefix}\`\nClick the button to see commands!\n\n**Command Categories**\n🖼・\`Image\`\n⛔・\`Moderation\`\n⚙・\`Utility\`\n\n_If you **need help** or **have trouble** using any **command** or **find a bug**, you can also join our [**Bot Support**](https://discord.gg/tMMgdGNcP3) Discord Server._`)
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('leftToUtility')
              .setEmoji('⬅')
              .setStyle('Success'),
              new ButtonBuilder()
              .setCustomId('homeButton')
              .setEmoji('🏠')
              .setStyle('Primary'),
              new ButtonBuilder()
              .setCustomId('deleteButton')
              .setEmoji('🔥')
              .setStyle('Secondary'),
              new ButtonBuilder()
              .setCustomId('rightToImage')
              .setEmoji('➡')
              .setStyle('Success')
            )
          ]
        });
      };

      if(interaction.customId === 'leftToImage') {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Commands List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setImage('https://cdn.discordapp.com/attachments/1049567647097950248/1068092536536707082/standard.gif')
            .setDescription(`Total command that I have now is \`${client.commands.size}\`\nCurrent prefix in **${message.guild.name}** is \`${prefix}\`\nClick the button to see commands!\n\n**Image Commands**\`\`\`yaml\nad, affect, beautiful, blur, clown, cuddle, deepfry, delete, feed, gay, gecg, grey, hug, invert, jail, kiss, mirror, monster, neko, nekogif, notstonk, pat, rip, sepia, slap, snyder, stonk, trash, triggered, wallpaper, wanted\`\`\`\n_If you **need help** or **have trouble** using any **command** or **find a bug**, you can also join our [**Bot Support**](https://discord.gg/tMMgdGNcP3) Discord Server._`)
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('leftToHome')
              .setEmoji('⬅')
              .setStyle('Success'),
              new ButtonBuilder()
              .setCustomId('homeButton')
              .setEmoji('🏠')
              .setStyle('Primary'),
              new ButtonBuilder()
              .setCustomId('deleteButton')
              .setEmoji('🔥')
              .setStyle('Secondary'),
              new ButtonBuilder()
              .setCustomId('rightToModeration')
              .setEmoji('➡')
              .setStyle('Success')
            )
          ]
        });
      };

      if(interaction.customId === 'leftToModeration') {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Commands List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setImage('https://cdn.discordapp.com/attachments/1049567647097950248/1068092536536707082/standard.gif')
            .setDescription(`Total command that I have now is \`${client.commands.size}\`\nCurrent prefix in **${message.guild.name}** is \`${prefix}\`\nClick the button to see commands!\n\n**Moderation Commands**\`\`\`yaml\nban, checkwarn, clear, hide, kick, lock, mute, removemuterole, resetwarn, setmuterole, setprefix, unhide, unlock, unmute, unwarn, warn\`\`\`\n_If you **need help** or **have trouble** using any **command** or **find a bug**, you can also join our [**Bot Support**](https://discord.gg/tMMgdGNcP3) Discord Server._`)
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('leftToImage')
              .setEmoji('⬅')
              .setStyle('Success'),
              new ButtonBuilder()
              .setCustomId('homeButton')
              .setEmoji('🏠')
              .setStyle('Primary'),
              new ButtonBuilder()
              .setCustomId('deleteButton')
              .setEmoji('🔥')
              .setStyle('Secondary'),
              new ButtonBuilder()
              .setCustomId('rightToUtility')
              .setEmoji('➡')
              .setStyle('Success')
            )
          ]
        });
      };

      if(interaction.customId === 'leftToUtility') {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Commands List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setImage('https://cdn.discordapp.com/attachments/1049567647097950248/1068092536536707082/standard.gif')
            .setDescription(`Total command that I have now is \`${client.commands.size}\`\nCurrent prefix in **${message.guild.name}** is \`${prefix}\`\nClick the button to see commands!\n\n**Utility Commands**\`\`\`yaml\navatar, botinfo, checknote, credits, delnote, evaluation, help, members, ping, serverinfo, setnote, snipe, weather, whois\`\`\`\n_If you **need help** or **have trouble** using any **command** or **find a bug**, you can also join our [**Bot Support**](https://discord.gg/tMMgdGNcP3) Discord Server._`)
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('leftToModeration')
              .setEmoji('⬅')
              .setStyle('Success'),
              new ButtonBuilder()
              .setCustomId('homeButton')
              .setEmoji('🏠')
              .setStyle('Primary'),
              new ButtonBuilder()
              .setCustomId('deleteButton')
              .setEmoji('🔥')
              .setStyle('Secondary'),
              new ButtonBuilder()
              .setCustomId('rightToHome')
              .setEmoji('➡')
              .setStyle('Success')
            )
          ]
        });
      };

      if(interaction.customId === 'rightToHome') {
        msg.edit({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Commands List`, iconURL: client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setImage('https://cdn.discordapp.com/attachments/1049567647097950248/1068092536536707082/standard.gif')
            .setDescription(`Total command that I have now is \`${client.commands.size}\`\nCurrent prefix in **${message.guild.name}** is \`${prefix}\`\nClick the button to see commands!\n\n**Command Categories**\n🖼・\`Image\`\n⛔・\`Moderation\`\n⚙・\`Utility\`\n\n_If you **need help** or **have trouble** using any **command** or **find a bug**, you can also join our [**Bot Support**](https://discord.gg/tMMgdGNcP3) Discord Server._`)
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('leftToUtility')
              .setEmoji('⬅')
              .setStyle('Success'),
              new ButtonBuilder()
              .setCustomId('homeButton')
              .setEmoji('🏠')
              .setStyle('Primary'),
              new ButtonBuilder()
              .setCustomId('deleteButton')
              .setEmoji('🔥')
              .setStyle('Secondary'),
              new ButtonBuilder()
              .setCustomId('rightToImage')
              .setEmoji('➡')
              .setStyle('Success')
            )
          ]
        });
      };
    });
  },
};