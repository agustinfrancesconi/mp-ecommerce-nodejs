var express = require('express');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');
const config = require('./config');

mercadopago.configurations.setAccessToken(config.accessToken);

var port = process.env.PORT || 3000

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/process_payment', (req, res) => {
    console.log(req.body);

    try {
    
    var payment_data = {
        transaction_amount: parseFloat(req.body.amount),
        token: req.body.token,
        //description: 'Lightweight Silk Watch',
        installments: parseInt(req.body.installments),
        payment_method_id: req.body.paymentMethodId,
        payer: {
          email: req.body.email
        }
      };

      console.log(payment_data);
      
      // Save and posting the payment
      mercadopago.payment.save(payment_data).then(function (data) {
            console.log(data);

            let resData = 
            `<b>Sua compra foi realizada!<b>
             <br>
             Dados da compra:
             <br>
             ${JSON.stringify(data)}
             `;

            res.send(resData);
          }).catch(function (error) {
            console.log(error);

            res.end('Erro:' + error);
          });
    }
    catch (error) {
        res.end('Erro:' + error);
    }
})

app.listen(port);