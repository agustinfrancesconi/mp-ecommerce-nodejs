# mp-ecommerce-nodejs

Este e-commerce de exemplo será a base para a integração de Mercado Pago com `nodejs`.

## Antes de começar

Essa aplicação deve ser acessível por um domínio público na internet, e para isso usaremos o [Heroku](https://heroku.com).

Requisitos para realizar a integração: 
* Possuir conta no [GitHub](http://github.com).
* Possuir conta no [Heroku](https://heroku.com).
* Possuir conta no [Mercado Pago](https://www.mercadopago.com.br).

## Tornando público meu e-commerce de exemplo

1. Realizar un fork desse projeto. Considerando que seu usuário de GitHub é `username`, teremos o repositório https://github.com/username/mp-ecommerce-nodejs
2. Acessar sua conta do Heroku
3. Criar uma aplicação no Heroku para realizar o deploy de nosso e-commerce. Nomea-la da seguinte maneira *username*-mp-commerce-nodejs. Exemplo:
<div style="text-align: center;" >
<img src="docs/step0.png" width=400 />
</div>

4. Conectar nossa aplicação "forkeada" no passo 1 ao Heroku.
<div style="text-align: center;" >
<img src="docs/step1.png" width=800 />
</div>

5. Ativar o deploy automático antes de qualquer alteração na branch "master". Realizar um deploy manualmente, através da opção "Deploy branch" para comprovar que a app está funcionando corretamente.
<div style="text-align: center;" >
<img src="docs/step2.png" width=800 />
</div>

6. Novamente considerando que seu usuário do GitHub é `username` (substituir na URL pelo correto), acessar https://username-mp-ecommerce-nodejs.herokuapp.com/ e validar que a app está em execução. Deverá vizualizar algo como o seguinte:
<div style="text-align: center;" >
<img src="docs/step3.png" width=800 />
</div>