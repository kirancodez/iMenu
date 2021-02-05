require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');

// Routes
const authRoute =require("./routes/auth");
const userRoute =require("./routes/user");

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



// My Routes
app.use("/api", authRoute);
app.use("/api", userRoute);


// Conecting  DB
mongoose.connect( process.env.DATABASE, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });


// Server start
let port = process.env.PORT || 9000;
app.listen(port)
