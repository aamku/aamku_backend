const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const Nexmo = require('nexmo'); 
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const nexmo = new Nexmo({
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET
});


router.post('/adminGenerateBill',(req,res) => {
 
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

             const data = {
               
                 ret_id:req.body.ret_id,
                 order_status:req.body.order_status
             };

             const phone = "91"+data.ret_id;
             const from = 'Nexmo';
             const message = 'Thanks, your order status has been confirmed.';
         

             if(err){
                 console.log('Error',err);
             }
             else{
                
                let coll = client.db('Aamku_connect').collection('Orders');
                coll.updateMany({$and:[{phone:data.ret_id},{order_status:data.order_status}]},{$set:{order_status:"approve"}},(err,result) => {

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
               
             }
         });

});

module.exports = router;