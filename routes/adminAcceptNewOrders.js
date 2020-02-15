const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const Nexmo = require('nexmo');

const dburl = process.env.URL; 

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const nexmo = new Nexmo({
    apiKey: process.env.APIKEY,
    apiSecret: process.env.APISECRET
  });
  
  router.post('/adminAcceptNewOrders',(req,res) => {

    const data = {
          
        product:req.body.product,
        mobile:req.body.phone,
        date:req.body.date,
        status:req.body.status
    };

    const phone = "91"+data.mobile;
    const from = 'Nexmo';
    const message = 'Thanks, your order status has been confirmed.';

                  MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
                          
                            if(err){
                                console.log("Error",err);
                            }
                            else{
                               
                                const coll = client.db("Aamku_connect").collection("Orders");
                                coll.find({$and:[{product_name:data.product},{order_date:data.date},{order_status:data.status},
                                           {phone:data.mobile}]},function(err,doc){

                                                if(err){
                                                    console.log("Error",err);
                                                }
                                               if(doc){

                                                const coll = client.db('Aamku_connect').collection('Orders');
                                                coll.updateMany({$and:[{phone:data.mobile},{order_date:data.date},
                                                {product_name:data.product}]},{$set:{order_status:"approve"}},(err,result) => {
                         
                                                 if(err){
                         
                                                     console.log("Error" +err);
                                                 
                                                 }else{
                         
                                                      res.send("Updated successfully");
                                                      console.log("Updated");
                                                      nexmo.message.sendSms(from,phone,message,(err,responseData) => {
                                                          
                                                            if(err){
                                                                console.log("Error",err);
                                                            }
                                                            else{
                                                                console.log(responseData);
                                                            }
                         
                                                      });
                                                      
                                                      client.close();
                                                 }
                         
                                                }) ;	
                                         }        

                                    });
                            }
                  });   
  });

  module.exports = router;