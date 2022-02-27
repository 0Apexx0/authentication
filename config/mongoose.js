const mongoose = require('mongoose');
 
// making setup to connect to the mongoDB atlas database
mongoose.connect('mongodb+srv://aditya:aditya123@cluster0.7kvvg.mongodb.net/Authentication_System_db');


// connecting to the database
const db = mongoose.connection;

// checking if there is any error
db.on('error', console.error.bind(console , "Error on connecting Database"));

// print sucess if database connection is sucessfull
db.once('open', ()=>{
    console.log('connect to Database :: MongoDB');
})

module.exports = db;