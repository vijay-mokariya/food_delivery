require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// const bodyparser = require('body-parser');
// app.use(bodyparser.json());

app.use(express.json());

app.use('/api/v1', require('./routes/index.routes'));

// app.use((error, req, res, next) => {
//     res.status(500).end(error.message);
//     console.log(error);
// });

app.use(require('./middlewares/errorHandler'))

app.listen(process.env.PORT, () => {
    require('./services/database')
    console.log(`connected on port number ${process.env.PORT}`)
});








// https://www.youtube.com/watch?v=xof1OgxcRhY

// https://www.youtube.com/watch?v=9KZwRBg4-P0&list=PL5eb-nnjclfTjxHXrUeTD1roACSmnC4CM

// https://github.com/search?q=order+status+chatbot&type=repositories 