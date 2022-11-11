require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');
const express = require('express');
const ejsLayout = require('express-ejs-layouts');
// connecting mongodb
const connectDB = require('./connections/mongodb.connection')();

const app = express();
// routes
const user = require('./routes/user.routes');

const admin = require('./routes/admin.routes');

// setting up session
app.use(session({ secret: 'criptSea', saveUninitialized: true, resave: true }));

// File Upload
app.use(fileUpload());

// setting up view engine
app.set('view engine', 'ejs');

// setting ejs layouts
app.use(ejsLayout);

// setting layout for admin
app.set('layout', 'layouts/layout');

// body-parser config;
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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
