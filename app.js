var express = require('express');
var exphbs  = require('express-handlebars');
var mercadopago = require('mercadopago');
mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-249219817450644-111300-1ac6fc62fb47adf917a9b3da9bb907c8-141751821'
});
var port = process.env.PORT || 3000

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded());

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/pay', async function (req, res) {
    console.log(req.body);
    const {token } = req.body;
    const {amount } = req.body;
    const {installments } = req.body;
    const {description } = req.body;
    const {paymentMethodId } = req.body;
    const {email } = req.body;

    var payment_data = {
        transaction_amount: parseInt(amount),
        token: token,
        description: description,
        installments: parseInt(installments),
        payment_method_id: paymentMethodId,
        payer: {
          email: email
        }
      };


    // Save and posting the payment
    mercadopago.payment.save(payment_data).then(function (data) {
        console.log(data);
        res.send(data);
    }).catch(function (error) {
        console.log(error);
    });
})

app.listen(port);