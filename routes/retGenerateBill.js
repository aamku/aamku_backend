const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/retGenerateBill',(req,res) => {
 
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

             const data = {
               
                 ret_id:req.body.ret_id,
                 date:req.body.date,
                 order_status:req.body.order_status
             };

             if(err){
                 console.log('Error',err);
             }
             else{
                
                let coll = client.db('Aamku_connect').collection('Orders');
                coll.find({$and:[{phone:data.ret_id},{order_date:data.date},{order_status:req.body.order_status}]}).toArray((err,result) => {

                              if(err){

                                console.log("Error",err);
                              }
                              else{

                                const output = result.map(r => ({'price':r.price}));
                                   
                                res.send(output);
                              }

                });                       
               
             }
         });

});

module.exports = router;