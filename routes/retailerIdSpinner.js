const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/retailerIdSpin',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

              const data = {
                     id:req.body.id
              };

                   if(err){
                       console.log("Error",err);
                   }
                   else{
                  
                        const coll = client.db("Aamku_connect").collection("AllRetailers");
                        coll.find({$and:[{status:"approved"},{salesperson_id:data.id}]}).toArray((err,result) => {
                                   
                            if(err){
                                console.log("Error",err);
                            }
                            else{

                                let output = result.map(r => ({'retailer_id':r.retailer_id,'name':r.name}));
 
                                res.send(output);
                                client.close();
                            }

                        });
                   }
    });

});

module.exports = router;