const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/saveUser',(req,res) => {
       
        const data = { 

              role:req.body.role,
              name:req.body.name,
              employee_id:req.body.employee_id,
              email:req.body.email,
              mobile:req.body.mobile,
              whatsapp:req.body.whatsapp,
              department:req.body.department
          };


                if(err){
                    console.log("Error",err);
                }
                else{

                    MongoClient.connect(dburl,{useNewUrlParser:true,useNewUnifiedTechnology:true},(err,client) => {

                              if(err){
                                  console.log("Error",err);
                              }
                              else{
                                  
                                const coll = client.db("Aamku_connect").collection("AllUsers");

                                coll.insertOne(data,(err,resp) => {
                                        
                                     if(err){
                                         console.log("Error",err);
                                     }
                                     else{
                                         resp.send("User created");
                                     }
                                        
                                });
                          }
                    });
                }

});

module.exports = router;