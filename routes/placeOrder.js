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
  

router.post('/placeOrder',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        const data = {
          
               id:req.body.ret_Id,
               date:req.body.date,
               order_status:req.body.order_status,
               mobile:req.body.mobil
           };

           const phone = "91"+9910568702;
           const from = 'Nexmo';
           const message = 'Thanks your order has been placed successfully';
      
           if(err){
                   console.log("Error",err);
               }
               else{

                const coll = client.db("Aamku_connect").collection("Orders");
                coll.find({$and:[{retailer_id:data.id},{order_date:data.date}]},function(err,doc){

                      if(err){
                          console.log("Error",err);
                      }
                      if(doc){

                       const coll = client.db('Aamku_connect').collection('Orders');
                       coll.updateMany({$and:[{retailer_id:data.id},{order_date:data.date}]},{$set:{order_status:data.order_status}},(err,result) => {

                        if(err){

                            console.log("Error" +err);
                        
                        }else{

                             res.send("Updated successfully");
                       
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



                      /*  coll.insertOne(status,function(err,resp){
                             
                               if(err){
                                   console.log("Error",err);
                               }
                               else{
                                   res.send("Order generated");
                               }
                        });  */
                      }
                      else{

                        res.send("No order found");
                      }
                });
            }
    });

});

module.exports = router;