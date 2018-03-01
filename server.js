const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  var now = new Date().toString();
  var log = now+':'+ req.method + ' ' + req.url;
  // console.log(now+':'+ req.method + ' ' + req.url);
  fs.appendFile('server.log', log + '\n', function(err){
    if(err){
      console.log('unable to append to server.log');
    };
  });
  next();
});

app.use(function(req, res, next){
    res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', function(){
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text){
  return text.toUpperCase();
});

app.get('/', function(req, res){
  // res.send('<h1>hello express</h1>');
  // res.send({
  //   name: 'estian',
  //   likes: [
  //     'gaming',
  //     'jog'
  //   ]
  // })

  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to this website'
  })
});

app.get('/about', function(req, res){
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.listen(port, function(){
  console.log('Server is up on port '+port);
});
