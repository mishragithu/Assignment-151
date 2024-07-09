let express = require("express");
let cors = require("cors");
let port = 3000;

let app = express();
app.use(cors());

//endpoint 1 
app.get("/cart-total", (req,res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = newItemPrice + cartTotal;
  res.send(result.toString());
});

//endpoint 2 
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";

  if (isMember) {
    let discountAmount = cartTotal * discountPercentage;
    let finalPrice = cartTotal - discountAmount;
    res.send(finalPrice.toString());
  } else {
    res.send(cartTotal.toString());
  }
});

//endpoint 3 
app.get("/calculate-tax", (req, res)=> {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxrate = 0.05;
  let taxAmount = cartTotal * taxrate;
  res.send(taxAmount.toString());
});

//endpoint 4 
app.get("/estimate-delivery", (req, res) => {

     let shippingMethod = req.query.shippingMethod;
     let distance = parseFloat(req.query.distance);

     let deliveryRate = shippingMethod === 'standard' ? 50 : shippingMethod === 'express' ? 100 : null;
     if (!deliveryRate) {
       return 'Invalid shippingMethod';
     }

     let deliveryDays = (distance / deliveryRate);
     res.send(deliveryDays.toString());
   });

//endpoint 5
app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let price = weight * distance * 0.1
  res.send(price.toString());
});

//endpoint 6 
app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyalityRate = 2 ;
  let loyalitypoints = purchaseAmount * loyalityRate;
  res.send(loyalitypoints.toString());
});

app.listen(port,() => {
  console.log("Server is running on http://localhost:" + port);
});