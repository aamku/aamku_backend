const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/getSalesRetailer',(req,res) => {

    const data = {
          id:req.body.id
    };

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

               if(err){
                   console.log("Error",err);
               }
               else{

                var coll = client.db("Aamku_connect").collection("AllRetailers");

                coll.find({salesperson_id:data.id}).toArray((err,result) => {

                    if(err){
                        console.log("Error",err);
                    }
                    else{
                        
                        let output = result.map(r => ({'name':r.name,'time':r.time,'status':r.status}));

                        res.send(output);
                        client.close();
                    }

                });

           }
    });
});

module.exports = router;