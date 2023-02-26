const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors') 
require('dotenv').config()
const port = process.env.PORT || 3300;
const routers = require('./src/routes/index')
const multer  = require('multer')
var bodyParser = require('body-parser')
const axios = require('axios');
const upload = multer({ dest: 'uploads/' })

const url = process.env.MONGO_URI
mongoose.set("strictQuery", true);
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => { console.log('DB connected successfully!!!') })
  .catch(err => { console.log("DB can't be connect", err) });

app.use(bodyParser.json());                        
app.use(express.urlencoded({ extended: true }));
// app.use(express.bodyParser());
app.use(express.json({ extended: false }));

app.use(cors({ origin: true, credentials: true }));
app.use("/api/v1", routers);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});