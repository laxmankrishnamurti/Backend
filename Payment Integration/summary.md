# What is the flow-chart for payment integration?

Integrating payment system into our application is not a big deal we just think that how these system works. Understand the basics of it what is the underlying concept of it. This is the only way to make things easy and understandable. Things never be complicated, we make things complicated. So, Understand as it is.

Before going deep-dive into it we must understand how does a typical transaction look like:-

We typically have a Bank account and a debit or credit card which is issued by the bank and we money will debit or credit from the account. Let's see how it works in tech.

For any organization or a bank they must verify our identity so that they should know who we are? To store any data about a person on internet we need a store which we typically call a Database. In that database there are million or billions of data of customers are stored into it and to process any request we make multiple servers.

So, let see how do we do transaction via internet or in web world.

<code>Payment Organization/Bank -> stores customer data into -> Database -> Fetched by -> Multiple Servers -> Process -> Payment Done</code>

- Payment Organization
  - Authentication
  - Authentication Token
  - Token + Payload(Customer data and it's Bank account or Card Details and the amount that will be credit or debit) sent to the server
  - Server makes a request to the Payment Organization's server or Bank Server to credit or debit the amount
  - After that server sends a response to the client to inform that whether the transaction will be success or get fail.
  - If Transaction will be successful the amount is debited or credited from the Bank account.

#### <code>There are lots of organization that helps to make the transaction easy. Ex :- stripe, Razorpay, .........etc. Lets disscuss about stripe and see how to integrate with our application for payment integration for our application.</code>

## Features about stipe payment.

- Easy to integrate
- Porvides custom UI(Widget) tool to make it better.

## Stripe code flow.

#### <code>UI Part</code>

- Use Noty or Flash to show messages on frontend.
- Install stripe client library.
  - Stripe provides two keys
    - Publishable key
    - Secret key

[Visit the GitHub Page](https://github.com/stripe/stripe-js)

```bash
$ npm install @stripe/stripe-js
$ yarn add @stripe/stripe-js
```

```bash
# import the library
import {loadStripe} from '@stripe/stripe-js';
```

- Make UI

[Follow the stripe element documentation](https://docs.stripe.com/)

```js
export async function stripeInit() {
  const stripe = await loadStripe("Stipe Publishable Key");

  //Display or hide card based on select option
  let card = null;

  function mountWidget(){
    const element = stripe.element()

    let style = {
      base: {"all styles" : value},
      invalid: {"all styles" : value}
    }
    card = element.create('card', { style: style, hidePostalCode: true})
    //Mounting the card into DOM.
    card.mount('#card-element)
  }

  const paymentType = document.querySelector("#paymentType")

  if(!paymentType){
    return
  }

  paymentType.addEventListener('change', (e) => {
    if(e.target.value === 'card'){
      mountWidget()
    }else {
      card.destroy()
    }
  })

}
```

- Test account card number for demo purpose.

  - CARD-NUMBER :: <code>4242 4242 4242 4242</code>

- Send a request to the stripe server to verify the card and get a token.

```js
//Client

export async function stripeInit() {
  const stripe = await loadStripe("Stipe Publishable Key");

  //Display or hide card based on select option
  let card = null;

  function mountWidget(){
    const element = stripe.element()

    let style = {
      base: {"all styles" : value},
      invalid: {"all styles" : value}
    }
    card = element.create('card', { style: style, hidePostalCode: true})
    //Mounting the card into DOM.
    card.mount('#card-element)
  }

  const paymentType = document.querySelector("#paymentType")

  if(!paymentType){
    return
  }

  paymentType.addEventListener('change', (e) => {
    if(e.target.value === 'card'){
      mountWidget()
    }else {
      card.destroy()
    }
  })

  //Sending request to stripe or submit the order if payment method is COD(Cash on Delivery)

  const paymentForm = document.querySelector('#payment-form');

  if(paymentForm){
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault()
      let formData = new FormData(paymentForm)
      let formObject = {}

      for(let [key, value] of formData.entries()){
        formObject.[key]= value
      }

      if(!card){
        //A Function that submit the order
        placeOrder(formObject)
        return;
      }

      //Verifying card and get a token
      await stripe.createToken()
      .then((data) => {
        formObject.stripeTokn = data.token.id
        placeOrder(formObject)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }

}
```

#### <code>It's up to on us that should we place the order if the payment fails and give an option to the customer to pay that much amount on COD.</code>

- Now, we should make a controller to debit the amount before creating an order book.

```bash
$ npm install stripe
$ yarn add stripe
```

```js
//Server

const Order = require('../../../models/order');
const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPT_PRIVATE_KEY);

export async handleOrder(){
  const {phone, address, stripeToken, paymentType} = req.body
  //Verify all inputs

  //Create a new order

  order.save()
  .then((result) => {
    Order.populate(result, {path: customerId}, (err, placedOrder)){
      //Stripe payment
      if(paymentType === 'card'){
        stripe.charges.create({
          amount: req.session.cart.totalPrice * 100,
          source: stripeToken,
          currency: 'inr',
          description: `Pizza order : ${placedOrder._id}`
        })
        .then(() => {
          placedOrder.paymentStatus = true;
          placedOrder.paymentType = paymentType;
          placedOrder.save()
          .then((res) => {
            //emit
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderPlaced', res)
            delete req.session.card
            return res.json({message: "Payment successful, Order placed successfully"})
          })
          .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          delete req.session.card
          return res.json({message: "Order placed but Payment Failed, you can pay at delivery time"})
        })
      }
    }
  })
  .catch((err) => {
    // req.flash('error', 'Something went wrong')
    // return req.redirect('/cart')
    return res.status(500).json({message: "Something went wrong"})
  })
}
```

- Go to the Stripe Dashboard and refresh the page. There should be payment history displayed.
- Help Tips :- Follow OOPS concept to organize and re-factor the code.
