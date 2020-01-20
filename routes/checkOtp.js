const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/checkOtp',(req,res) => {

          const data = {
              otp:req.body.otp  
          };

          MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                    if(err){
                        console.log("Error",err);
                    }
                    else{

                        const coll = client.db("Aamku_connect").collection("Otps");
                        coll.findOne({otp:data.otp},function(err,doc){

                                     if(err){
                                         console.log("Error",err);
                                     }
                                     if(doc){
                                           res.send("Exists");
                                     }  
                                     else{
                                        res.send("not exists");
                                     }
                        });
                    }
        
          });

});

module.exports = router;