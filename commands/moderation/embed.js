const { MessageEmbed } = require('discord.js');

async function run(client, message) {
	// Logic here

  const embed = new MessageEmbed()
    .setColor(process.env.COLOR)
    .setTitle('This is an Embed');

  return message.reply({ embeds: [embed] });
}

module.exports = {
  name: 'embed',
  id: 'classic',
  run,
};
