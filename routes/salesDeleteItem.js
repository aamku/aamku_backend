const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/salesDeleteItem',(req,res) => {

    const data = {

         name:req.body.name,
         orderType:req.body.orderType,
         orderQty:req.body.orderQty,
         singleLine:req.body.singleLine,
         fourLine:req.body.fourLine,
         square:req.body.square,
         interLeaf:req.body.interLeaf,
      //   orderAmount:req.body.orderAmount,
         totalAmount:req.body.totalAmount,
         disAmount:req.body.disAmount
     };

     MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

              if(err){

                  console.log("Error",err);
              }
              else{

                const coll = client.db("Aamku_connect").collection("Orders");

                coll.deleteOne({$and:[{name:data.name},{order_type:data.orderType},{quantity:data.orderQty},{single_rule_quantity:
                data.singleLine},{fourline_quantity:data.fourLine},{square_line_quantity:data.square},{oneside_inter_leaf:data.interLeaf},
                {total_price:data.totalAmount},{discount_price:data.disAmount}]},function(err,obj) {

                     if(err){
                         console.log("Error",err);
                     }
                     else{
                         res.send("Deleted");
                     }

                });
              }
     });

});

module.exports = router;