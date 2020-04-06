// start.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(`mongodb://localhost:27017/${process.env.DATABASE_NAME}`, {
    useMongoClient: true,
  })
  .then(() => {
    console.log('connected to mongoDB', process.env.DATABASE_NAME);
  });
mongoose.Promise = require('bluebird');

mongoose.connection.on('error', err => {
  console.error(`🚫 Database Error 🚫  → ${err}`);
});

/* You should require your models here so you don't have to initialise them all the time in
  different controlers*/
require('./models/Shop');

const app = require('./app');
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
