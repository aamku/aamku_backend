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

router.post('/retailerLoginOtp',(req,res) => {

    const data = {
          
        phone:req.body.phone
    };

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const phone = req.body.phone;
    const from = 'Nexmo';
    const message = 'Your Otp for phone verification is: ' + otp;

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                          if(err){
                              console.log("Error",err);
                          }
                          else{

                            const coll = client.db("Aamku_connect").collection("AllRetailers");
                            coll.findOne({mobile:data.phone},function(err,doc){

                                if(err){
                                    console.log("Error",err);
                                }
                                if(doc){
                                  //    res.send("Exists");

                                 //Nexmo

                                 nexmo.message.sendSms(from,phone,message,(err,responseData) => {

                                    if(err){
                                        console.log("My Error",err);
                                    }
                                    else{
                        
                                        MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
                        
                                            if(err){
                                                console.log("Error",err);
                                            } 
                                            else{
                                             
                                                const coll = client.db("Aamku_connect").collection("Otps");
                                                coll.insertOne({otp:otp}).then((resp) => {
                                               
                                                       res.send("Otp send successfully");
                        
                                                }).catch((error) => {
                        
                                                     console.log("Error",error);
                                                });
                                                
                                            }
                                           
                                         });  
                                    }
                                          
                                });
                        

                                 //Nexmo ends


                                }  
                                else{
                                   res.send("Register before login");
                                }
                             });
             }
    });
 
});

module.exports = router;