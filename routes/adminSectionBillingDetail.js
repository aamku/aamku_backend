const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/adminSectionBillingDetail',(req,res) => {

       const data = {
            id:req.body.ret_Id,
            date:req.body.date,
            order_status:req.body.order_status
       };

       MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                  if(err){

                    console.log("Error",err);
                  }
                  else{

                    const coll = client.db("Aamku_connect").collection("Orders");
                    coll.find({$and:[{phone:data.id},{order_date:data.date},{order_status:data.order_status}]}).toArray((err,result) => {
                             
                             if(err){
                                 console.log("Error",err);
                             }
                             else{

                                let output = result.map(r => ({'pname':r.product_name,'type':r.order_type,'qty':r.quantity,
                                'sline':r.single_rule_quantity,'sqline':r.square_line_quantity,'fline':r.fourline_quantity,
                                        'oneside':r.oneside_inter_leaf,'price':r.price}));
 
                                res.send(output);
                                client.close();
                             }
                    });
                  }
       });
});

module.exports = router;