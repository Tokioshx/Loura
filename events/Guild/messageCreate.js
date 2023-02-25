const client = require('../../index');
const { Events, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

client.on(Events.MessageCreate, async (message) => {
  let prefix = await db.get(`prefix_${message.guild.id}`) || client.config.prefix;

  if(message.mentions.has(client.user)) {
    if(message.author.bot || !message.guild || message.content.includes('@here') || message.content.includes('@everyone') || message.type == 19 || message.mentions.roles.first()) return;

    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`Hello ${message.author.username}! Good to see you mention me, if you forget my prefix or want to know what my prefix in this server, my prefix is \`${prefix}\`. You can use \`${prefix}help\` to see command list!`)
      ]
    });
  };

  if(message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

  if(!command) return;
  await command.run(client, message, args).catch((error) => {
    console.log(error);
    message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setDescription('Looks like something went wrong with the commands, please try again soon.')
      ]
    });
  });
});