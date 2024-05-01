const connectToMongo = require('./db')
connectToMongo();
const express = require('express');
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json());
// Available routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(port, () => {

    console.log("I am on iNoteBook project at the port: " + port);
})