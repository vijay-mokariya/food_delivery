const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongoDB')
})

db.on('error', (err) => {
    console.log('connection error', err)
})

module.exports = db;


