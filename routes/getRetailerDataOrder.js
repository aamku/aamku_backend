const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL; 

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/getRetailerDataOrder',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
                       
           const data = {
               phone:req.body.phone
           };

           if(err){
               console.log("Error",err);
           }
           else{

            const coll = client.db('Aamku_connect').collection('AllRetailers');
            coll.find({mobile:data.phone}).toArray((err,result) => {

                         if(err){
                             console.log("Error",err);
                         }
                         else{

                            const output = result.map(r => ({'name':r.name,'phone':r.mobile,'address':r.address}));
                            res.send(output);
                         }
            });
          
        }

    });
});

module.exports = router;