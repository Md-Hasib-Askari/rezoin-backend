const app = require('express')();
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const xssClean = require('xss-clean');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./src/routes/api');
const {MONGODB_CONNECTION} = require("./config");

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(hpp({checkBody: true, checkQuery: true}));
app.use(xssClean());

mongoose.connect(MONGODB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then( console.log("MongoDB Connected"));

app.use('/api/v1', router);

module.exports = app;