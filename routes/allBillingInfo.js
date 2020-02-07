const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/allBillingInfo',(req,res) => {

       const data = {
            id:req.body.ret_Id
       };

       MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                  if(err){

                    console.log("Error",err);
                  }
                  else{

                    const coll = client.db("Aamku_connect").collection("Orders");
                    coll.find({retailer_id:data.id}).toArray((err,result) => {
                             
                             if(err){
                                 console.log("Error",err);
                             }
                             else{

                                let output = result.map(r => ({'pname':r.product_name,'type':r.order_type,'qty':r.quantity,
                                'sline':r.single_rule_quantity,'sqline':r.square_line_quantity,'fline':r.fourline_quantity,
                                        'oneside':r.oneside_inter_leaf));
 
                                res.send(output);
                                client.close();
                             }
                    });
                  }
       });
});

module.exports = router;