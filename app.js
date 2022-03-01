//Express server
const express = require('express')
const app = express()

//body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//mongoose and connect to MongoDB (Database name Product)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Product');

//mongoose schema
const productSchema = new mongoose.Schema({
    name:  String, // String is shorthand for {type: String}
    description: String,
    price:   Number
   
  });

//mongoose model (Table name in SQL)
const Product = mongoose.model('Product', productSchema);  


//create New Product
// http://localhost:3000/api/v1/create
app.post('/api/v1/create',async(req,res)=>{
    //create product
    const product=await Product.create(req.body);

    res.status(200).json({
        success:true,
        product
    })
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})