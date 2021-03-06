const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL; 

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/getRetNewOrderFragOrdDetails',(req,res) => {
     
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        const data = {
                  phone:req.body.phone,
                  date:req.body.date
              };
             
             if(err){
                 console.log('Error',err);
             }
             else{

                 const coll = client.db('Aamku_connect').collection('Orders');
                 coll.findOne({$and:[{phone:data.phone},{order_date:data.date}]},function(err,doc){

                     if(err){
                         console.group("Error",err);
                     }
                     if(doc){

                         const coll = client.db('Aamku_connect').collection('Orders');
                         coll.find({$and:[{salesperson_id:data.phone},{order_status:data.status}]}).toArray((err,result) => {
                                  
                             if(err){
                                 console.group("Error",err);
                             }
                             else{
                                 const output = result.map(r => ({'cost':r.price,'prodname':r.product_name,
                                                  'order_type':r.order_type,'quantity':r.quantity,'single_line':r.single_rule_quantity,
                                                   'square_line':r.square_line_quantity,'four_line':r.fourline_quantity,
                                                   'interleaf':r.oneside_inter_leaf}));
                                 res.send(output);   
                             }
                                  
                         });
                     }
                     else{
                         res.send("No order found");
                     }
                 });
             }

       });

});

module.exports = router;