const { MessageEmbed } = require('discord.js');

async function run(client, interaction) {
  const embed = new MessageEmbed()
    .setColor(process.env.COLOR)
    .setTitle('Test completed ✅');
  return interaction.reply({ embeds: [embed] });
}

module.exports = {
  name: 'test',
  id: '882966267403853924',
  run,
};
