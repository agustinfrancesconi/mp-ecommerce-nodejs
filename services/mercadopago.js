const MP = require('../clients/mercadopago');

// const createPreference = (data) => {
//     return new Promise((resolve, reject) => {
        
//         // Crea un objeto de preferencia
//         let preference = {
//             items: [
//                 {
//                     id: 1234,
//                     title: 'Mi producto',
//                     unit_price: 100,
//                     quantity: 1,
//                 }
//             ]
//         };
        
//         MP.preferences.create(preference)
//         .then(function(response){
//             // Este valor reemplazará el string "$$init_point$$" en tu HTML
//             resolve(response);
//             global.init_point = response.body.init_point;
//             resolve(response.body.init_point);
//         }).catch(function(error){
//             console.log(error);
//         });
//     })
// }

const getPreferenceId = ({title = 'Title genérico', price = 1000, img}) => {
    return new Promise((resolve, reject) => {
        
        // Nombre y Apellido: Lalo Landa
        // DNI (Número de Identificación): 22.333.444
        // Email: El email del test-user pagador generado.
        // Teléfono: 011 2222-3333
        
        // Nombre de la calle: Falsa
        // Número de la casa: 123
        // Código postal: 1111
        
        

        // ID: 1234 /////
        // Nombre del Producto: Nombre del producto seleccionado. ///////
        // Descripción del Producto: “Dispositivo móvil de Tienda e-commerce” //////
        // URL Imagen: Foto del producto seleccionado.
        // Cantidad: 1 //////
        // Precio: Precio del producto seleccionado. ///////

        // external_reference: ABCD1234

        
        // Crea un objeto de preferencia
        let preference = {
            "items": [
                {
                    id: 1234,
                    title: title,
                    description: "Dispositivo móvil de Tienda e-commerce",
                    picture_url: `http://localhost:3000/${img}`,
                    unit_price: Number(price),
                    quantity: 1,
                }
            ],
            "payer": {
                name: 'Lalo Landa',
                email: 'test_user_63274575@testuser.com',
                indentification: {
                    type: 'DNI',
                    number: '22333444'
                },
                phone: {
                    area_code: '011',
                    number: 22223333
                },
                address: {
                    zip_code: '1111',
                    street_name: 'falsa',
                    street_number: 123
                }
            },
            "payment_methods": {
                excluded_payment_methods: [
                    {
                        "id": "amex"
                    }
                ],
                excluded_payment_types: [
                    {
                        "id": "atm"
                    }
                ],
                installments: 6
            },
            "external_reference": 'ABCD1234',
            "back_urls": {
                "success": "https://nicorodrigues-mp-commerce-node.herokuapp.com//payments/success",
                "failure": "https://nicorodrigues-mp-commerce-node.herokuapp.com//payments/failure",
                "pending": "https://nicorodrigues-mp-commerce-node.herokuapp.com//payments/pending"
            },
            "auto_return": "approved",
            "notification_url": "https://nicorodrigues-mp-commerce-node.herokuapp.com//notifications"
        };
        
        MP.preferences.create(preference)
        .then(function(response){
            // Este valor reemplazará el string "$$init_point$$" en tu HTML
            console.log(response);
            resolve(response.body.id);
            global.init_point = response.body.init_point;
            console.log(response.body.init_point);
        }).catch(function(error){
            console.log(error);
        });
    })
}

module.exports = {
    // createPreference,
    getPreferenceId
}