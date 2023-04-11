const mongoose = require('mongoose');

const connectionString = "mongodb+srv://theokennel:sXVYgSHbyWi5ONIp@cluster0.2tyyz8w.mongodb.net/hackaton"

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
