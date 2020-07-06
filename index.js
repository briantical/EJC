const mongoose = require('mongoose');
const app = require('./src/index');

const PORT = 5000;
const DB_URI = 'mongodb://localhost:27017/bonny';
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
