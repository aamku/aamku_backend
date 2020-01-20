const express = require('express');
const Nexmo = require('nexmo');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const nexmo = new Nexmo({
    apiKey: process.env.APIKEY,
    apiSecret: process.env.APISECRET
  });
  
  const dburl = process.env.URL;
  
   router.use(bodyParser.json());
   router.use(bodyParser.urlencoded({extended: true}));

   router.post('/sendOtp',(req,res) => {

        const otp = Math.floor(1000 + Math.random() * 9000);
        const phone = req.body.phone;
        const from = 'Nexmo';
        const message = 'Your Otp for phone verification is: ' + otp;
        

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

    });

   module.exports = router;
