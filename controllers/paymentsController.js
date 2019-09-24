const MP = require('../services/mercadopago');

const createInit = async (req, res) => {
    let preference = await MP.getPreferenceId(req.query)

    console.log(preference);
    res.send(preference);
}

const getPreferenceId = async (req, res) => {
    let preference_id = await MP.getPreferenceId(req.query)

    return preference_id;
}


// El pago haya sido “rechazado” o no haya finalizado (failure)
// El usuario haya decidido pagar con un medio de pago offline (atm o ticket) y el pago quede en un estado “pending” o “in_process” (pending)
// El pago haya sido exitoso. En la pantalla se deberá mostrar el payment_method_id que se usó para pagar, el monto pagado, el número de orden del pedido y el ID de pago de Mercado Pago (approved)
// Se deberá configurar para que desde el checkout de Mercado Pago el retorno en caso de pago aprobado sea automático (auto_return).


const paymentSuccess = (req, res) => {
    console.log('success: ', req.query)
    let data = req.query;
    let status = '';
    if (data.collection_status === 'approved') {

    }
    
    res.render('after-payment', {
        status: 'Compra exitosa',
        id: data.collection_id,
        message: `Tu compra se realizó con éxito`
    });
}

const paymentFailure = (req, res) => {
    console.log('failure: ', req.query)
    let data = req.query;
    res.render('after-payment', {
        status: 'Error al realizar compra',
        id: data.collection_id,
        message: `Tu compra no pudo ser procesada con éxito. Intentá nuevamente. ID de pago: ${data.collection_id}`
    });
}

const paymentPending = (req, res) => {
    console.log('pending: ', req.query)
    let data = req.query;

    res.render('after-payment', {
        status: 'El pago está pendiente.',
        id: data.collection_id,
        message: 'Tu compra se realizó con éxito pero tu pago se encuentra pendiente. Te llegará una notificación avisandote cuando se haya procesado.'
    });
}

module.exports = {
    createInit,
    getPreferenceId,
    paymentPending,
    paymentSuccess,
    paymentFailure
}