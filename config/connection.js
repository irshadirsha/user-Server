
const mongoose = require('mongoose');

const db = () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log('Database Connected successfully'))
      .catch((error) => {
        console.error('Error connecting to the database:', error);
      });
  };
  

module.exports = db


  
