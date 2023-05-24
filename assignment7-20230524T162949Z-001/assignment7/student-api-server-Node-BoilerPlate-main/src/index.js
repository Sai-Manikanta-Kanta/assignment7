// const express = require('express')
// const app = express()
// const bodyParser = require("body-parser");
// const port = 8080
// app.use(express.urlencoded());

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// // your code goes here


// app.listen(port, () => console.log(`App listening on port ${port}!`))
const express = require('express');
const mongoose = require('./connection');
const userRoutes = require('./routes');
const app = express();
const port = 8080;
// Middleware to parse JSON
app.use(express.json());
// Routes
app.use('/api', userRoutes);
// Start server
app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});

module.exports = app;   