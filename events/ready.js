// eslint-disable-next-line no-unused-vars
const commandData = require('../json/commandData.json');

module.exports = async (client) => {
  console.log(`Logged in as ${client.user.tag}!`);

  // eslint-disable-next-line global-require
  await require('../handlers/command')(client);

  await client.guilds.cache.get('882719457963831377')?.commands.set(commandData);
  await client.guilds.cache.get('880877029443137607')?.commands.set(commandData);

  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'LU Programmers code',
      type: 'WATCHING',
    },
  });
};
