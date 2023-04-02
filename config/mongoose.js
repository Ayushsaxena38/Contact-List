//require the library, mongoose .
const mongoose = require('mongoose');

//connect to the database.
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});//don't write=>mongoose.connect('mongodb://localhost/contact_list_db');

//aquire the connection to check if it is successfull.
const db = mongoose.connection;

//if error occured then this db.on() will notify by showing this message.
db.on('error',console.error.bind(console,'error connecting to db'));

//when the connection is successfully established the db.onse() will notify by showing this message.
db.once('open',function(){
    console.log('successfully connected to the data base')
});