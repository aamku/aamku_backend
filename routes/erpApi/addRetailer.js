const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/getRetailers',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                let coll = client.db('Aamku_connect').collection("AllRetailers");
                coll.find({}).toArray((err,result) => {

                       if(err){
                           console.log("Error",err);
                       }
                       else{

                           const output = result.map(r => ({"name":r.name,"salesperson_id":r.salesperson_id,"retailer_id":r.retailer_id,
                                    'email':r.email,'store':r.store_name,'mobile':r.mobile,'whatsapp':r.whatsapp,'gst':r.gst,
                                    'state':r.state,'city':r.city,'address':r.address,'pin':r.pin,'services':r.services,'status':r.status,'date':
                                     r.date}));
                           res.send(output);
                       }

                });
        });

});

module.exports = router;


