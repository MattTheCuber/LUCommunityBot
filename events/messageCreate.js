const prefix = '-';

module.exports = async (client, message) => {
  if (message.content.toLowerCase().startsWith(`${prefix}embed`)) {
    client.commands.get('embed').run(client, message);
  }
};
