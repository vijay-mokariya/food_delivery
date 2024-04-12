require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const bodyparser = require('body-parser');
app.use(bodyparser.json());

app.use('/api', require('./routes/app'));

app.listen(process.env.PORT, () => {
    require('./db')
    console.log(`connected on port number ${process.env.PORT}`)
});