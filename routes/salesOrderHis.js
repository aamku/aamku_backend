const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/salesOrderHis',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                    if(err){
                        console.log('Error',err);
                    }
                    else{

                        const coll = client.db('Aamku_connect').collection('Orders');
                        coll.find({}).toArray((err,result) => {

                             if(err){
                                 console.log("Error",err);
                             }
                             else{

                                const output = result.map(r => ({}));
                                res.send(output);
                             }
                        });
                    }
    
    });

});

module.exports = router;