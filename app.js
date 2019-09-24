require('dotenv').config()
var express = require('express');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const paymentsController = require('./controllers/paymentsController')

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', async function (req, res) {
    res.render('detail', {...req.query, preference_id: await paymentsController.getPreferenceId(req, res)});
});

app.get('/notifications', (req,res) => {
    console.log(req.body, req.query)
})

app.post('/notifications', (req,res) => {
    console.log(req.body, req.query)
})

app.get('/payments/success', paymentsController.paymentSuccess);
app.get('/payments/failure', paymentsController.paymentFailure);
app.get('/payments/pending', paymentsController.paymentPending);

app.post('/payments/success', paymentsController.paymentSuccess);
app.post('/payments/failure', paymentsController.paymentFailure);
app.post('/payments/pending', paymentsController.paymentPending);


app.get('/pay', paymentsController.createInit);
app.post('/pay', (req, res) => {
    res.redirect(req.body.back_url)
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(process.env.PORT || 3000);