const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/getStates',(req,res) => {


    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
                            
        if(err){
            console.log("Error",err);
        }
        else{
            
            const coll = client.db("Aamku_connect").collection("AllRetailers");
            coll.distinct("state",function(err,docs){
               
                if(err){
                    console.log('Error',err);
                }
                else{
                    
                    let output = docs.map(r => ({'state':r}));
                    res.send(output);       
                }

            });
         }

    });
});

module.exports = router;