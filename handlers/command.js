const { readdirSync } = require('fs');
const Ascii = require('ascii-table');

const table = new Ascii().setHeading('Command', 'Status');

module.exports = async (client) => {
  const reduceSlashCommands = (acc, val) => {
    acc[val.id] = {
      name: val.name,
      description: val.description,
      options: val.options,
    };
    return acc;
  };
  
  const superReduceSlashCommands = (acc, val) => {
    acc[val.id] = val.name;
    return acc;
  };

  const fullSlashCommands = await client.guilds.cache.get('882719457963831377')?.commands.fetch();
  const slashCommands = fullSlashCommands.reduce(reduceSlashCommands, {});


  readdirSync('./commands/').forEach((dir) => {
    const commands = readdirSync(`./commands/${dir}/`);
    commands.forEach((file) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const pull = require(`../commands/${dir}/${file}`);


      if (pull.id === 'classic') {
        table.addRow(pull.name, '✅ Command Loaded!');
        client.commands.set(pull.name, pull);
      } else if (slashCommands[pull.id]) {
        table.addRow(pull.name, '✅ Command Loaded!');

        pull.description = slashCommands[pull.id].description || '';
        pull.options = slashCommands[pull.id].options;

        client.commands.set(pull.name, pull);
      } else if (pull.name && !pull.subCommand) table.addRow(file, '❌ -> Command failed to load!');
    });
  });

  console.log(table.toString());

  const slashCommands2 = fullSlashCommands.reduce(superReduceSlashCommands, {});
  console.log(slashCommands2);
};
