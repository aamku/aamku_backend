const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/deleteOrder',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
                  
             let data = {
                 id:req.body.retailer_id   
             };
             
             if(err){
                 console.log("Error",err);
             }
             else{

                let coll = client.db('Aamku_connect').collection('TemporaryOrder');

                coll.deleteMany({retailer_id:data.id}, function(err,obj){
                       
                    if(err){
                        
                        console.log("Error",err);
                    }
                    else{
                        
                        res.send("deleted");
                        client.close();
                    }
                });
             }
    });

});

module.exports = router;

