require('dotenv/config');
const express = require('express');
const exphbs = require('express-handlebars');
const mercadoPagoController = require('./lib/mercadoPagoController');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/detail', function(req, res) {
  res.render('detail', req.query);
});

app.post('/processar_pagamento', mercadoPagoController.payment);

app.listen(port);
