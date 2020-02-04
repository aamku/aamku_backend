const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL; 

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/getTotalPrice',(req,res) => {


    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        const data = {

            retailer_id:req.body.retailer_id
        };
                              
                         if(err){
                                  console.log("Error",err);
                              }
                              else{

                                const coll = client.db('Aamku_connect').collection('TemporaryOrder');
                                coll.find({retailer_id:data.retailer_id}).toArray((err,result) => {

                                        if(err){
                                            console.log("Error",err);
                                        }
                                        else{

                                            const output = result.map(r => ({'cost':r.price}));
                                            res.send(output);
                                        }
                                });
                      }
    });

});

module.exports = router;