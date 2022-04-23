const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require("cors");

// import routes
const authRoute = require("./routes/api/auth");

dotenv.config();

//CORS
app.use(cors);

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Connected to db");
});

//Middlewares
// app.use(cors());
// app.use(express.json());

//Route
app.use("/routes/api", authRoute);

// route
app.get("/ready", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () =>
  console.log(`server running on ${process.env.PORT}`)
);
