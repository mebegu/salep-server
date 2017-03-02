const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

mongoose.Promise = global.Promise;
const conn = mongoose.connect('mongodb://host:port/SalepDB');


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
router(app);


app.listen(8000);
