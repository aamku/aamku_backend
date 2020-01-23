const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/getSalesRetailer',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

               if(err){
                   console.log("Error",err);
               }
               else{

                var coll = client.db("Aamku_connect").collection("AllRetailers");

                let output = result.map(r => ({'name':r.name,'time':r.time}));

                res.send(output);
                client.close();
               }
    });
});

module.exports = router;