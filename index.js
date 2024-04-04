require('dotenv').config();
const express = require('express');
const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

app.use('/',require('./routes/app'));

app.listen(process.env.PORT, () => {
    require('./db')
    console.log(`connected on port number ${process.env.PORT}`)
});