require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');

const express = require('express');
// routes
const admin = require('./routes/admin.routes');
const user = require('./routes/user.routes');

const app = express();

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(`Connection Succesful ${res}`))
  .catch((err) => console.log(`Error in DB connection ${err}`));
// setting up session
app.use(session({ secret: 'criptSea', saveUninitialized: true, resave: true }));

// File Upload
app.use(fileUpload());

// body-parser config;
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// setting up view engine
app.set('view engine', 'ejs');
// setting up public directory
app.set(express.p);
// setting up View directory
app.use(express.static(path.join(__dirname, 'public')));
// set routes
app.use('/', user);
app.use('/admin', admin);

app.listen(process.env.PORT, () => {
  console.log(`Application is listening at port ${process.env.PORT}`);
});
