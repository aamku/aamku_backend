const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/getProducts',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                let data = {

                	name:req.body.name
                }

                    if(err){
                    	console.log("Error",err);
                    }
                    else{
                       
                       let coll = client.db('Aamku_connect').collection('ItemsAddedByAdmin');

                       coll.find({product_name:data.name}).toArray((err,result) => {

                                 if(err){
                                 	console.log("Error",err);
                                 }
                                 else{

                                 	let output = result.map(r => ({'name':r.product_name,'sku':r.product_sku,
                                                   'page':r.pages,'mrp':r.mrp,'size':r.size,'outerpack':r.outer_pack,
                                                       'sp':r.selling_price}));

                                 	res.send(output);
                                 	client.close();
                                 }
                       }); 

                    }
    });

});

module.exports = router;