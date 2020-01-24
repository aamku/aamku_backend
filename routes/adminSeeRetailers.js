const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/adminSeeRetailers',(req,res) => {

             MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
                          
                if(err){
                    console.log("Error",err);
                }
                else{

                    const coll = client.db("Aamku_connect").collection("AllRetailers");
                    coll.find({}).toArray((err,result) => {
                             
                        if(err){
                            console.log("Error",err);
                        }
                        else{

                            let output = result.map(r => ({'name':r.name,'mobile':r.mobile,'gst':r.gst,'state':r.state,
                                                    'pin':r.pin,'address':r.address}));
 
                            res.send(output);
                            client.close();
                        }
                    });
                }

             });
});

module.exports = router;