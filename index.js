const { Client, Collection, Intents } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE'] });

client.mongo = require('./utils/mongoose');

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');
config();

fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const evt = require(`./events/${file}`);
    const evtName = file.split('.')[0];

    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});

client.mongo.init();
client.login(process.env.TOKEN);
