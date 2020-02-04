const express = require('express');
const router = express.Router; 
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL; 

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/orderbySalesPerson',(req,res) => {
     
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        const data = {
            
            quantity:req.body.quantity,
            order_type:req.body.order_type,
            product_name:req.body.product_name,
            price:req.body.price
            
        };
               
        if(err){
            console.log("Error",err);
        }
        else{

            const coll = client.db('Aamku_connect').collection('Orders');
            coll.insertOne(data,(err,resp) => {

                if(err){
                    console.log("Error",err);
                }
                else{
                    res.send("order generated");
                }
            });
            
        }

    });
});

module.exports = router;