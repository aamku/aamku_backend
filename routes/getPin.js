const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/getPin',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

          const data = {
              city:req.body.city
            };
  
         const coll = client.db("Aamku_connect").collection("AllRetailers");      
         coll.find({city:data.city}).toArray((err,result) => {

                if(err){
                    console.log("Error",err);
                }
                else{

                    const output = result.map(r => ({"pin":r.pin}));
                    res.send(output);
                }
         }); 
    });
});

module.exports = router;