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
                      id:req.body.id,
                      status:req.body.status,
                      stats:req.body.stats
                  };
                 
                 if(err){
                        console.log('Error',err);
                    }
                    else{

                        const coll = client.db('Aamku_connect').collection('Orders');
                        coll.find({$and:[{phone:data.id},{$or:[{order_status:data.status},{order_status:data.stats}]}]}).toArray((err,result) => {

                             if(err){
                                 console.log("Error",err);
                             }
                             else{

                                const output = result.map(r => ({'order_id':r._id,'name':r.name,'phone':r.phone,'address':r.address,
                                            'cost':r.price,'date':r.order_date,'prodname':r.product_name,
                                            'order_type':r.order_type,'quantity':r.quantity,'single_line':r.single_rule_quantity,
                                             'square_line':r.square_line_quantity,'four_line':r.fourline_quantity,
                                             'interleaf':r.oneside_inter_leaf,'status':r.order_status}));
                                    
                                res.send(output);
                             }
                        });
                    }
    
    });

});

module.exports = router;