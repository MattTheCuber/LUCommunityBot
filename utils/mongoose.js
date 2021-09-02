const mongoose = require('mongoose');

function init() {
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    connectTimeoutMS: 10000,
    family: 4,
  };

  mongoose.connect('mongodb+srv://bot:1thess4@cluster.i4kr6.mongodb.net/LUCommunityBot?retryWrites=true&w=majority', dbOptions);
  // mongoose.set('useFindAndModify', false);
  mongoose.Promise = global.Promise;

  mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
  });

  mongoose.connection.on('err', (err) => {
    console.error(`Mongoose connection error:\n${err.stack}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose is disconnected!');
  });
}

module.exports = {
  init,
};
