require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const httpError = require('./utils/HttpError');


app.use(cors());



// const bodyparser = require('body-parser');
// app.use(bodyparser.json());

app.use(express.json());

app.set('view engine', 'ejs');

app.use('/api/v1', require('./routes/index.routes'));

// app.use((error, req, res, next) => {
//     res.status(500).end(error.message);
//     console.log(error);
// });

app.use(require('./middlewares/errorHandler'));

app.listen(process.env.PORT, () => {
    require('./services/database')
    console.log(`connected on port number ${process.env.PORT}`)
});
