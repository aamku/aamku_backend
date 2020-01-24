const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const admin = require('firebase-admin');
const serviceAccount = require("./service_account.json");
const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/adminItemAddByAdmin',(req,res) => {

    const data = {
        product_sku:req.body.product_sku,
        product_name:req.body.product_name,
        quantity:req.body.quantity,
        order_type:req.body.order_type,
        pages:req.body.pages,
        mrp:req.body.mrp,
        single_line_quantity:req.body.single_line_quantity,
        four_line_quantity:req.body.four_line_quantity,
        square_line_quantity:req.body.square_line_quantity,
        oneside_line_quantity:req.body.oneside_line_quantity
        
       };

       MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                           if(err){
                               console.log("Error",err);
                           }
                           else{

                                const coll = client.db("Aamku_connect").collection("ItemsAddedByAdmin");
                                coll.insertOne(data,(err,resp) => {
                                      
                                      if(err){
                                          console.log("Error",err);
                                      }
                                      else{
                                          res.send("Item added");
                                          client.close();
                                      }
                                });
                           }
       });

    });

       module.exports = router;