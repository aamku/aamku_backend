const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/getCities',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
                            
        const data = {
             state:req.body.state
        };
    
        if(err){
            console.log("Error",err);
        }
        else{
            
            const coll = client.db("Aamku_connect").collection("AllRetailers");
            coll.findOne({state:data.state},function(err,doc){
                       
                if(err){
                    console.log("Error",err);
                }
                if(doc){
                  //  console.log("yes");
                  const collc = client.db("Aamku_connect").collection("AllRetailers");
                  collc.distinct("city",function(err,docs){
               
                    if(err){
                        console.log('Error',err);
                    }
                    else{
                        
                        let output = docs.map(r => ({'city':r}));
                        res.send(output);       
                    }
    
                });
                }
                else{
                    console.log("no");
                }

            });
         }

    });
});

module.exports = router;