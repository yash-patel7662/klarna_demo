const express = require('express')
const klarna = require('klarna-checkout')
// const klarna = require('klarna-node').default;
const axios = require('axios').default;
const bodyParser = require("body-parser");

klarna.init({
    eid: "PN03669_78da82df69b6",
    secret: "6GXDbJYEgwZdpGNN",
    live: false
})

klarna.config({
    purchase_country: "US",
    purchase_currency: "USD",
    locale: "en-US",
    layout: "desktop",
    terms_uri: "https://www.example.com/terms.html",
    cancellation_terms_uri: "https://www.example.com/terms.html",
    checkout_uri: "https://www.example.com/checkout.html",
    confirmation_uri: "https://www.example.com/confirmation.html",
    push_uri: "https://www.example.com/api/push"
})

const order = {
    "order_amount": 50000,
    "order_tax_amount": 4545,
    "order_lines": [
        {
            "type": "physical",
            "reference": "19-402-USA",
            "name": "Red Shirt",
            "quantity": 5,
            "quantity_unit": "pcs",
            "unit_price": 10000,
            "tax_rate": 1000,
            "total_amount": 50000,
            "total_discount_amount": 0,
            "total_tax_amount": 4545
        }
    ],
    "shipping_options": [
        {
            "id": "free_shipping",
            "name": "Free Shipping",
            "description": "Delivers in 5-7 days",
            "price": 0,
            "tax_amount": 0,
            "tax_rate": 0,
            "preselected": true,
            "shipping_method": "Home"
        },
        {
            "id": "pick_up_store",
            "name": "Pick up at closest store",
            "price": 399,
            "tax_amount": 0,
            "tax_rate": 0,
            "preselected": false,
            "shipping_method": "PickUpStore"
        }
    ]
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/create-order", (req, res) => {
    console.log("PLace")
    klarna.place(order)
    console.log("PLacing order")
});

app.post("/", (req, res) => {

});

app.listen(8000, () => {
    console.log("App started at port 8000");
});