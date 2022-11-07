const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log(`Connection Succesful ${res}`))
    .catch((err) => console.log(`Error in DB connection ${err}`));
};
