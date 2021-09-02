const { MessageEmbed } = require('discord.js');

async function run(client, interaction) {
	// Logic here

  const embed = new MessageEmbed()
    .setColor(process.env.COLOR)
    .setTitle('This is an Embed');

  return interaction.reply({ embeds: [embed] });
}

module.exports = {
  name: 'COMMAND_NAME',
  id: 'COMMAND_ID', // Make sure to register your slash command in commandData.json to get the ID: https://discordjs.guide/interactions/registering-slash-commands.html
  run,
};
