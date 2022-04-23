const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cors = require('cors')

// import routes
const authRoute = require('./routes/api/auth');
const amenityRoute = require('./routes/api/amenity');

dotenv.config();

const db = mongoose.connection;

// Connect to DB
mongoose.connect( process.env.DB_CONNECT, ()=>{
    console.log('Connected to db')
});

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//Middlewares
app.use(cors());
app.use(express.json());

//Route
app.use('/routes/api', authRoute);
app.use('/routes/api', amenityRoute);


// route
app.get('/ready', (req, res) => {
    res.send('hello world')
})


app.listen(process.env.PORT, ()=>console.log(`server running on ${process.env.PORT}`))