function sendError(importance, title = '', description = '', footer = '') {
  const importanceColors = [
    process.env.COLOR_SUCCESS,
    process.env.COLOR,
    process.env.COLOR_WARN,
    process.env.COLOR_ERROR,
  ];

  const embed = new MessageEmbed()
    .setColor(importanceColors[importance])
    .setTitle(title);
  if (description) embed.setDescription(description);
  if (footer) embed.setFooter(footer);

  return embed;
}

module.exports = {
  sendError,
};