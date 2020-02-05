const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL; 

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/orderbySalesPerson',(req,res) => {
     
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        const data = {
            
            retailer_id:req.body.retailer_id,
            salesperson_id:req.body.salesperson_id,
            name:req.body.name,
            phone:req.body.phone,
            address:req.body.address,
            order_date:req.body.order_date,
            quantity:req.body.quantity,
            order_type:req.body.order_type,
            product_name:req.body.product_name,
            price:req.body.price,
            single_rule_quantity:req.body.single_rule_quantity,
            fourline_quantity:req.body.fourline_quantity,
            square_line_quantity:req.body.square_line_quantity,
            oneside_inter_leaf:req.body.oneside_inter_leaf
            
        };
               
        if(err){
            console.log("Error",err);
        }
        else{

            const coll = client.db('Aamku_connect').collection('Orders');
            coll.insertOne(data,(err,resp) => {

                if(err){
                    console.log("Error",err);
                }
                else{
                  //  res.send("order generated");

                    const coll = client.db('Aamku_connect').collection('TemporaryOrder');     
                    coll.insertOne(data,(err,resp) => {
                       
                        if(err){
                            console.log("Error",err);
                        }
                        else{
                            res.send("order generated");
                        }
                    });               
                }
            });
            
        }

    });
});

module.exports = router;