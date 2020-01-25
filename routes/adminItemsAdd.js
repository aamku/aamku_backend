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

router.post('/adminItemAdd',(req,res) => {

    const data = {
        product_sku:req.body.product_sku,
        product_name:req.body.product_name,
        gst_hsn_code:req.body.gst_hsn_code,
        product_quantity:req.body.product_quantity,
        size:req.body.size,
        brand:req.body.brand,
        mrp:req.body.mrp,
        selling_price:req.body.selling_price,
        order_type:req.body.order_type,
        rule_type:req.body.rule_type,
        date:req.body.date
        
       };

       MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) =>{

                  if(err){
                      console.log("Error",err);
                  }
                  else{

                      const coll = client.db("Aamku_connect").collection("ItemsAddedByAdmin");
                      coll.insertOne(data,(err,response) => {

                        if(err){
                            console.log("Error",err);
                        }
                        else{

                            res.send("Item added");
                        }

                      });
                      
                  }
       });
});

module.exports = router;