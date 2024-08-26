# Payment Integration with Razorpay

- Step-01 :: Create server and client.

```bash
$ mkdir server
$ npm create vite@latest .
```

- Step-02 :: Create an account on Razorpay

  - Settings
    - Customize the payment dashboard
    - Generate API keys(Keep it secret in enviroment variable file)
      - API key
      - Secret key

- Step-03 :: Create an express server and create MVC model
- Step-04 :: Install Razorpay and import it.

```bash
$ npm i razorpay
```

```js
//index.js or server.js
import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
```

- Step-05 :: Create routes and controllers for payment

```js
import {instance} from '../server.js'

export const checkout = async (req, res){
    const options = {
        amount: Number(req.body.amount)*100,
        currency: "INR",
        recipt: "Book order"
    }

    const order = await instance.orders.create(options)
    console.log("Order :: ",order)
    return res.status(200).json({
        success: true,
        orderId: order.id
    })
}
```

Test with Postman.

- Make UI and add whitelist the domain name and make a request to the server on the payment gateway route. And install all necessary dependencies.

  - Add the script into index.html file(Client side -> React app)
    [In case if the has been changed](https://razorpay.com/docs)

  ```html
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  ```

  - Handle credit or debit amount on client-side.

  ```js
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/api/checkout", { amount });

    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "Laxman Krishnamurti",
      description: "Book order",
      image: "url",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/paymentvarification",
      profile(loginUserDetails): {
        name: "Pallavi jain",
        email: "pallavvijain@gmail.com",
        contact: 2514527854,
      },
      notes: {
        address: "main street",
      },
      theme: {
        color: '#4234b1'
      }
    };

    const razor = new window.Razorpay(options)
    razor.open()
  };
  ```

#### <code>Razorpay testing card details. For VISA -> 4111 1111 1111 1111</code>

- Step-07 :: We will get these three result values

```js
{
    razorpay_payment_id: 'lasdkjf32l4kjwlk32j',
    razorpay_order_id: 'alsjd34klj323kj4h',
    razorpay_signature: 'klj34h23kj4hkhrk23jh4k2jh34kj23h4kbrwek23kj4h23kh'
}
```

- Step-08 :: Authenticate the razorpay_signature with sha25 algorithm with the help of payment_id and order_id.

  - sha25(razorpay_payment_id + razorpay_order_id) = razorpay_signature

- Step-09 :: Verification

```js
import { instance } from "../server.js";
import crypto from "crypto";

export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  const isValidSignature = expectedSignature === razorpay_signature;

  if (isValidSignature) {
    //Save into db
  } else {
    res.status(403).json({
      success: "Payment failed, Signature is unvalid",
    });
  }
};
```

#### <code>Redirect the user on success page or order page or anywhere as you want.</code>

#### <code>Flow-Chart</code>

- Backend

  - Instance
  - Checkout -> To create razorpay order -> Get token or id

- Frontend

  - Request key -> Get the orderkey
  - Request to the order
  - Razorpay POP-UP window (index.html -> script)
  - Payment
  - After payment the request reached to the callback url and add all the razorpay_id into request object

- Backend
  - Get all ids and the signature
  - Verify the signature
  - Save the data into database.
  - Redirect the user to the success page.
