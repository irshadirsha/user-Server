
const mongoose = require('mongoose');

const db = () => {
    mongoose
      .connect('mongodb://127.0.0.1:27017/mactest')
      .then(() => console.log('Database Connected successfully'))
      .catch((error) => {
        console.error('Error connecting to the database:', error);
      });
  };
  

module.exports = db