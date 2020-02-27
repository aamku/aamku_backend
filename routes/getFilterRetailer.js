const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/getFilterRetailer',(req,res) => {
 
        MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
           
            const data = {
              
                state:req.body.state,
                city:req.body.city
            };

                      if(err){
                          
                        console.log("Error",err);
                      
                    }
                    
                /*    if(data.city){
                        
                         
                    }  */
                      else{
                         
                        const coll = client.db("Aamku_connect").collection("AllRetailers");
                        coll.find({$and:[{state:data.state},{city:data.city}]}).toArray((err,result) => {

                                    if(err){
                                        console.log("Error",err);
                                    }
                                    else{

                                        const output = result.map(r => ({'name':r.name,'mobile':r.mobile,'gst':r.gst,'state':r.state,
                                        'pin':r.pin,'address':r.address}));

                                        res.send(output);
                                    }
                        });
                  }

           });        
});

module.exports = router;