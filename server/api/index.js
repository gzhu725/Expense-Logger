require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const app = express();
const mongoString = process.env.ATLAS_URI;

// new, from routes folder
const routes = require('./routes/routes'); 
app.use('/api', routes)

// error checking
module.exports = router;
router.post('/post', (req, res) => {
    res.send('Post API')
})

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
