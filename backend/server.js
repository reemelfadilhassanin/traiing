// server.js
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const { searchJobs } = require('./controllers/searchController');
const config = require('./config');
const app = express();

// Connect to MongoDB
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(chalk.green('Connected to MongoDB'));
  })
  .catch(err => {
    console.log(chalk.red('Error connecting to MongoDB:', err));
  });

// Set up Content Security Policy (CSP) headers
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'none'; " +
    "style-src 'self' https://fonts.googleapis.com; " +
    "font-src https://fonts.gstatic.com;");
  next();
});

// Define routes
app.get('/search', searchJobs);
app.get('/', (req, res) => {
  res.send('Welcome to job portals!');
});
// Start server
const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(chalk.green(`Server running at http://${hostname}:${port}/`));
});
