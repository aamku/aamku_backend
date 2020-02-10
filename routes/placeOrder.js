const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL; 

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/placeOrder',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        const data = {
          
               id:req.body.ret_Id,
               date:req.body.date,
               order_status:req.body.order_status
           };

      
           if(err){
                   console.log("Error",err);
               }
               else{

                const coll = client.db("Aamku_connect").collection("Orders");
                coll.find({$and:[{retailer_id:data.id},{order_date:data.date}]},function(err,doc){

                      if(err){
                          console.log("Error",err);
                      }
                      if(doc){

                       const coll = client.db('Aamku_connect').collection('Orders');
                       coll.updateOne({$and:[{retailer_id:data.id},{order_date:data.date}]},{$set:{order_status:data.order_status}},(err,result) => {

                        if(err){

                            console.log("Error" +err);
                        
                        }else{

                             res.send("Updated successfully");
                             client.close();
                        }

               }) ;	



                      /*  coll.insertOne(status,function(err,resp){
                             
                               if(err){
                                   console.log("Error",err);
                               }
                               else{
                                   res.send("Order generated");
                               }
                        });  */
                      }
                      else{

                        res.send("No order found");
                      }
                });
            }
    });

});

module.exports = router;