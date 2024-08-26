# What is the flow-chart for payment integration?

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
