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

function getPaymentStatus(status) {
    let status_pt_br = status;
    
    if (status == 'approved') { status_pt_br = 'Aprovado' };
    if (status == 'rejected') { status_pt_br = 'Rejeitado' };
    if (status == 'in_process') { status_pt_br = 'Em processamento' };

    return status_pt_br;
};

function getPaymentStatusDetail(statusDetail) {
    let descStatus = statusDetail;

    if (statusDetail == 'accredited') {
        descStatus = 'Pronto, seu pagamento foi aprovado!';
    }
    else if (statusDetail == 'pending_contingency') {
        descStatus = 'Estamos processando o pagamento. Em até 2 dias úteis informaremos por e-mail o resultado.';
    }
    else if (statusDetail == 'cc_rejected_bad_filled_security_code') {
        descStatus = 'Confira o código de segurança.';
    }

    return descStatus;
}

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
            `<b>Sua compra foi enviada!</b>
             <br>Confira abaixo o status do pagamento
             <br>
             <h1>Status do Pagamento:<b> ${getPaymentStatus(data.body.status)}</b></h1>
             <p> ${getPaymentStatusDetail(data.body.status_detail)} </p>

             <br>
             JSON Response:
             <div>
             ${JSON.stringify(data)}
             </div>
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