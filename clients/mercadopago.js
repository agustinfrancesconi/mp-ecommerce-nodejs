const MP = require('mercadopago');

MP.configure({
    access_token: process.env.MP_API_SECRET
});





module.exports = MP