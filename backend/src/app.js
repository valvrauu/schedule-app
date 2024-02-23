require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const mongoose = require('mongoose');
const mongoStore = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');

const { checkError, generateToken } = require('./middlewares/csrf');

const home_routes = require('./routes/home');

const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }

});

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => app.emit('ok'))
    .catch(e => console.log(e));

// EJS Config
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Parse JSON requests
app.use(express.json());

// Serve static files
app.use(express.static(path.resolve(__dirname, '..', '..', 'frontend', 'public')));

// Configure sessions
app.use(sessionOptions);

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Flash messages
app.use(flash());

// Helmet protection
app.use(helmet());

// CSRF protection
app.use(csrf());
app.use(checkError);
app.use(generateToken);

// Routes
app.use(home_routes);

app.on('ok', () => {
    app.listen(port, () => {
        console.log('server started on port:');
        console.log('http://localhost:3000');
    });
})