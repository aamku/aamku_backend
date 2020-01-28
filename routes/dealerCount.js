const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/dealerCount',(req,res) => {

          MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                              if(err){
                                  console.log("Error",err);
                              }
                              else{

                                const coll = client.db("Aamku_connect").collection("Dealers");
                                coll.countDocuments(function(err,resp){

                                          if(err){
                                              console.log("Error",err);
                                          }
                                          else{
                                             
                                             res.send({"total": resp});
                                          }
                                });
                           }
          });

});

module.exports = router;