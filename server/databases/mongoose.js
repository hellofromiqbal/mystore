const mongoose = require('mongoose');
const { dbHost, dbPort, dbName } = require('../config/config');

const PORT = 3001;

const mongooseConnection = (app) => {
  mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)
    .then(() => {
      console.log('Connected to MongoDb.');
      app.listen(PORT, () => {
        console.log(`App is listening in port http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = mongooseConnection;