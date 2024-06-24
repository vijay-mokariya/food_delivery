require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const httpError = require('./utils/HttpError');
const logger = require('morgan');

app.use(cors());

// const bodyparser = require('body-parser');
// app.use(bodyparser.json());

app.use(express.json());
app.use(logger('dev'));

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









/*

i have make one website that name is easycollab.
this website basically use into a internal company uses.
in this website many role like emplooyee,admin,marketing team,project manager,etc...
this website work for comapany marketing team take project from the outside for example upwork,linkdin etc and
than they bidding for it if requirement fulfill than that team create a application that contain all detaial related that project in the website and
when client ready for make project in our company than marketing team convert that application into inquery than
company project manager metting with the cliend and descussion related the project if all is good and client ready to make project with us than
that inquery convert into the project,
and employee also give their task update,they order the snacks and book they given by our organization.
that all about my website

*/