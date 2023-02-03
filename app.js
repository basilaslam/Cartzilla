require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');
const express = require('express');
const ejsLayout = require('express-ejs-layouts');

const { PORT } = process.env;
const app = express();

// connecting mongodb
const connectDB = require('./connections/mongodb.connection')();

// routes
const user = require('./routes/user.routes');

const admin = require('./routes/admin.routes');

// sockets.connect(io);

// setting up session
app.use(session({ secret: 'criptSea', saveUninitialized: true, resave: true, rolling: true }));

// File Upload
app.use(fileUpload());

// setting up view engine
app.set('view engine', 'ejs');

app.use('/node-scripts', express.static(`${__dirname}/node_modules/`));

// setting ejs layouts
app.use(ejsLayout);

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

// Socket.io Connections

const server = app.listen(PORT, () => {
  console.log(`Application is listening at port ${PORT}`);
});
// eslint-disable-next-line import/order
const io = require('socket.io')(server);

app.set('socketio', io);
// set routes
app.use('/', user);
app.use('/admin', admin);
