const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const router = express.Router();
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const querystring = require('querystring');

const dburl = process.env.URL;
const sms = process.env.URI;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/testSms',(req,res) => {

      const phone = req.body.phone;
      const msg  = req.body.msg;
      const ms = "My nam is aakash";  

      request({
          url:sms+phone+'&message='+msg+" "+ms,
          method:'GET'
        },function(err,response){
                  
            if(err){
                console.log("Error",err);
            }
            else{
                console.log(response);
            }

        });
    });

module.exports = router;

