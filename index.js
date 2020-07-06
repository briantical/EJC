const mongoose = require('mongoose');
const app = require('./src/index');

const PORT = process.env.port;
const DB_URI = 'mongodb://briantical:lutbrian96IV*@ds255958.mlab.com:55958/heroku_ln8xkrgn';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

mongoose.connect(DB_URI, options, (error) => {
  if (error) throw error;
  console.log('Successfully started the database');
});
