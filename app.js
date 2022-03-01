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

//Read data
app.post('/api/v1/read',async(req,res)=>{
    //find product
    const product=await Product.find();

    res.status(200).json({
        success:true,
        product
    })
})

//Update
app.put('/api/v1/update/:id',async(req,res)=>{

    //check if this user exist or not
    let product=await Product.findById(req.params.id);
    //if user not exist
    if(!product){
       return res.status(500).json({
            success:false,
            message:"User Dont exits with this id"
        })
    }
    //if user exist then update
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
        useFindAndModify:true,
        runValidators:true
    });
    res.status(201).json({
        success:true,
        product
    })
})

//Delete
app.delete('/api/v1/delete/:id',async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
       return res.status(500).json({
            success:false,
            message:"User with this Id dont exist"
        })
    }
    
    //if we find product
    product.remove();
    res.status(200).json({
        success:true,
        message:"Successfully Deleted"
    })
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})