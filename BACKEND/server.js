// import express from 'express';
// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
// import cors from 'cors';
const {check,validationResult} = require('express-validator')
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs');
//const config = require('config');
// import data from './products.js';

//const data = require('./products');
mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection Open !!");
    })
    .catch(err => {
        console.log(err);
    })

//MAKING THE PRODUCTS DATABASE
const prodSchema = new mongoose.Schema({
    dbType: String,
    id: Number,
    title: String,
    price: String,
    img: String,
    type: String,
    quantity: Number,
    token:String,
    email: String,
    password: String,
    name: String,
    isAdmin: Boolean,

});



const Product = mongoose.model('Product', prodSchema);

const app = express();
app.use(express.json())
//const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get("/api/products", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    //console.log("Getting products");
    const prods = await Product.find({ dbType: 'Products', type: req.headers.type });
    res.send(prods);
})



app.get("/api/products/:id", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let tempId = new String();
    for (let i = 14; i < req.url.length; ++i) {
        tempId += req.url[i];
    }
    const id = parseInt(tempId, 10);
    console.log(id);

    Product.find({ id: id }).then(data => res.send(data));
    // res.send(resToSend);
})

app.post("/cart/products/remove", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    await Product.remove({ id: req.headers.id, dbType: 'Cart'});
    const prods = await Product.find({ dbType: 'Cart' });
    res.send(prods);
    // res.send('Cart Item Removed');
})


app.get("/cart/products/:token", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let i=14
    let tempToken = new String();
    for (;i<req.url.length ; i++) {
        tempToken += req.url[i];
    }
    console.log("Get temp",tempToken)
    const prods = await Product.find({ dbType: 'Cart',token:tempToken });
    res.send(prods);
})

app.post("/cart/:id/:quantity/:token", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    let tempId = new String();
    let i = 0;
    for (i = 6; req.url[i] !== '/'; ++i) {
        tempId += req.url[i];
    }
   // console.log(req.url)
    i++;
    let tempQuantity = new String();
    for (; req.url[i] !== '/'; ++i) {
        tempQuantity += req.url[i];
    }
   // console.log(tempQuantity)
    var tempToken = new String();
    
    for (;i<req.url.length ; i++) {
        tempToken += req.url[i];
    }
   // console.log("tmp",tempToken)
    const prod = await Product.find({ id: tempId, dbType: 'Products'});
   // console.log("IN SERVER")
    const currItem = new Product({
        dbType: 'Cart',
        id: tempId,
        token:tempToken,
        quantity: tempQuantity,
        title: prod[0].title,
        price: prod[0].price,
        img: prod[0].img,
    })
    await currItem.save();
    // console.log(tempId + ' ' + tempQuantity);
    // console.log(prod[0]);
    res.send('Successfully saved to DB');

})

app.post("/add-product", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const newProduct = new Product({
        dbType: 'Products',
        id: req.headers.id,
        title: req.headers.title,
        price: req.headers.price,
        img: req.headers.img,
        type: req.headers.type,
    })
    await newProduct.save();
    res.send(req.headers);

})



app.post('/login',[
        check('email','Please enter valid email').isEmail(),
        check('password','Password Required').exists()
    ],
   async (req,res)=>{
       //console.log('in post server login')
    res.header("Access-Control-Allow-Origin", "*");
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.headers;
    try{
         let user = await Product.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{msg:"Invalid Credentials"}]});
        }
        
        console.log(user.id);
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res
            .status(400)
            .json({errors:[{msg:"Invalid Credentials"}]});

        }
        
    
        const payload ={
            user:{
                id:user._id
            }
        }
        const id=user._id
        console.log(user._id)
        jwt.sign(payload,
             "mysecrettoken",
            {expiresIn : 360000},
            (err,token,)=>{
                if(err) throw err;
                res.json({id});
        });
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }    
});



// app.post("/add-user", async (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     console.log(req.headers.email);
//     const checkUser =await Product.findOne({ dbType: 'Users', email: req.headers.email });
//     if (checkUser) {
//         res.send("User exits");
//     }
//     else {
//         const newUser = new Product({
//             dbType: 'Users',
//             email: req.headers.email,
//             name: req.headers.name,
//             password: req.headers.password
//         })
//         newUser.save();
//         res.send("User saved");
//     }
// })

//Sign up

app.post('/add-user',[
    check('name','name is required').not().isEmpty(),
    check('email','Please enter valid email').isEmail(),
    check('password','Enter Password with length >5').isLength({min:6})
    ],
   async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password}=req.headers;
    try{
         let user = await Product.findOne({email});
        if(user){
            return res.status(400).json({errors:[{msg:"User already exists"}]});
        }
        user=new Product({
            dbType: 'Users',
            email: req.headers.email,
            name: req.headers.name,
            password: req.headers.password
        })

        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
        const payload ={
            user:{
                id:user.id
            }
        }
        console.log("NEW USER");
        jwt.sign(payload,
            "mysecrettoken",
            {expiresIn : 360000},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
        });
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server errorrr');
    }
    
});
app.listen(5000, () => console.log('Server started'));