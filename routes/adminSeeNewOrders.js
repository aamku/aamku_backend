const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL; 

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/adminSeeNewOrders',(req,res) => {
     
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        const data = {
                  
                  status:req.body.order_status
              };
             
             if(err){
                 console.log('Error',err);
             }
             else{
                
                const coll = client.db('Aamku_connect').collection('Orders');
                coll.find({order_status:data.status}).toArray((err,result) => {
                         
                    if(err){
                        console.group("Error",err);
                    }
                    else{
                        const output = result.map(r => ({'name':r.name,'phone':r.phone,'address':r.address,'product':r.product_name,
                                         'cost':r.price,'date':r.order_date,'status':r.order_status}));
                        res.send(output);   
                    }
                         
                });
             
             }

       });

});

module.exports = router;