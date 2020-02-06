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

        const data = {
                         phone:req.body.phone
                    };
                    
                    if(err){
                        console.log('Error',err);
                    }
                    else{

                        const coll = client.db('Aamku_connect').collection('Orders');
                        coll.find({phone:data.phone}).toArray((err,result) => {

                             if(err){
                                 console.log("Error",err);
                             }
                             else{

                                const output = result.map(r => ({'order_id':r._id,'name':r.name,'phone':r.phone,'address':r.address,
                                            'cost':r.price,'date':r.order_date}));
                                res.send(output);
                             }
                        });
                    }
    
    });

});

module.exports = router;