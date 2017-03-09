const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config.json');

mongoose.Promise = global.Promise;
const conn = mongoose.connect(config.db);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
router(app);


app.listen(config.port);