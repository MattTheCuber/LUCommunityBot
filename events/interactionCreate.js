const { sendError } = require('../utils/discord');

async function command(client, interaction) {
  const cmd = client.commands.get(interaction.commandName);
  if (cmd) cmd.run(client, interaction);

  setTimeout(() => {
    if (!interaction.replied) interaction.editReply({ embeds: [sendError(3, 'Error sending message', 'Unknown error', 'code: iC1')] });
  }, 895000);
}

module.exports = async (client, interaction) => {
  if (interaction.isCommand()) command(client, interaction);
};
