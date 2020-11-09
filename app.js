const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const productsRoute = require('./routes/products');
const authRoute = require('./routes/auth')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/products', productsRoute);
app.use('/auth', authRoute)

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTCTION, { useUnifiedTopology: true , useNewUrlParser: true }, () =>{
   console.log('Db Connected')
});

//Start server on port 3000
app.listen(3000);
