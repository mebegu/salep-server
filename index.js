const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// mongoose.Promise = global.Promise;
// const conn = mongoose.connect('mongodb://172.20.122.77:27017/salepDB');


app.use(bodyParser.json());
apdsdp.use(cookieParser());
app.use(cors());
router(app);


app.listen(5567);
