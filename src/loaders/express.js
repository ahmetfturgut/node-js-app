const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); 
const mongoSanitize = require('express-mongo-sanitize'); 
 
const app = express();
  
app.use(mongoSanitize());
app.use(helmet());
app.use(cors());
 

app.get('/hello', (req, res, next) => {
	res.send('Hello World');
	next();
});

 

module.exports = app;
