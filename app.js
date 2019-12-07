var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});
app.post('/processar_pagamento', (req, res) => {
    console.log(req.body)
    // return 
    const paymentData = req.body
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken("TEST-6226973357766324-120714-737f825f1fedf6905a50e051e80da0ab-273610248");

    var payment_data = {
        transaction_amount: Number(paymentData.amount),
        token: paymentData.token,
        description: paymentData.description,
        installments: Number(paymentData.installments),
        payment_method_id: paymentData.paymentMethodId,
        issuer_id: "310",
        payer: {
            email: paymentData.email
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
app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.listen(port);