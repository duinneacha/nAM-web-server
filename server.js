const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;

// Set up the view engine - Handlebars
app.set('view engine', 'hbs');

// Register Handlebars partial intention and location
hbs.registerPartials(__dirname + '/views/partials');

// Register Helper in Handlebars - allows common code to be registered
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.use is how you register Middleware




// Maintenence screen - uses app.use without next() call, above other gets - forcing this page
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Site is currently down for Maintenance'
//   });
// });

// Let node know the static folder
app.use(express.static(__dirname + '/public'));

// req - request, res - response, next - tells middleware when the function is done <- has to be called to exit the function
app.use((req, res, next) => {
  const now = new Date().toString();
  var log = `Time: ${now} path: ${req.path} url: ${req.url} method: ${req.method}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hiya Express!!!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the AD Home Page'
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - sending back a basic error message
app.get('/bad', (req, res) => {
  res.send({
    error: 'An error has occurred',
    errMessage: 'This error has happened because because'
  });
});


app.listen(port, () => {
  console.log(`Server is up and running on Port ${port}`);
});


