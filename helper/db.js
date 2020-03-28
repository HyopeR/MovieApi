const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://movie_user:123123aa@ds151662.mlab.com:51662/heroku_cz8m8m3v',
      {
        //useMongoClient: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
      });
  mongoose.connection.on('open', () => {
    //console.log('MongoDB: Connected.');
  });

  mongoose.connection.on('error', (error) => {
    //console.log('MongoDB: Error', error);
  });

  //Mongoose Promise ayarlama.
  mongoose.Promise = global.Promise;
};