require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.ATLAS_URI;

// new, from routes folder
const routes = require('./routes/routes'); 
app.use('/api', routes)

// error checking
const express = require('express');
const router = express.Router()
module.exports = router;


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})