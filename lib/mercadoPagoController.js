const mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

const MercadoPago = {
  payment: async (req, res) => {
    try {
      const { email, amount, description, token, paymentMethodId } = req.body;
      const payment_data = {
        transaction_amount: 181,
        token: token,
        description: description,
        installments: 1,
        payment_method_id: paymentMethodId,
        payer: {
          email: email
        }
      };

      let { body } = await mercadopago.payment.save(payment_data);

      switch (body.status) {
        case 'approved':
          res.render('afterPayment', {
            message: 'Compra Aprovada com Sucesso'
          });
        case 'reject':
          res.render('afterPayment', {
            message: 'Compra Rejeitada'
          });
      }
    } catch (e) {
      console.log('error:', e);
      res.status(500).json({ error: true, message: e.message });
    }
  }
};

module.exports = MercadoPago;
