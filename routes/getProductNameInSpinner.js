const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/getProductNameInSpinner',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                   if(err){
                       console.log("Error",err);
                   }
                   else{
                  
                        const coll = client.db("Aamku_connect").collection("ItemsAddedByAdmin");
                        coll.distinct("product_name",(function(err,docs){
                            
                           // let output = docs.map(r => ({'product_name':docs.product_name}));
                           let output = docs.map(r => ({'product_name':r}));
                              res.send(output);       
                           // res.send({"product_name":docs});
                        }));


                      /*  coll.find({}).toArray((err,result) => {
                                   
                            if(err){
                                console.log("Error",err);
                            }
                            else{

                                let output = result.map(r => ({'product_name':r.product_name}));
 
                                res.send(output);
                                client.close();
                            }

                        });  */
                   }
    });

});

module.exports = router;