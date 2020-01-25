const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/getPendingRetailers',(req,res) => {

        
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                         if(err){
                             console.log("Error",err);
                         }
                         else{

                            
                      const coll = client.db("Aamku_connect").collection("ItemsAddedByAdmin");
                      coll.insertOne(data,(err,response) => {

                                        
                                       if(err){
                                           console.log("Error",err);
                                       }
                                       else{
                                        
                                        let output = result.map(r => ({'name':r.product_name,'sku':r.product_sku,'pages':r.pages,'mrp':r.mrp,
                                                                   'inner':r.inner_pack,'outer':r.outer_pack}));
 
                                        res.send(output);
                                        client.close();
                                       }
                            });
                     }
    });
});

module.exports = router;