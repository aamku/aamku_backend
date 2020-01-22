const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const admin = require('firebase-admin');
const serviceAccount = require("./service_account.json");
const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aamku-connect.firebaseio.com"
});

router.post('/saveRetailer',(req,res) => {

    const data = {
             salesperson_id:req.body.added_by,
             name:req.body.name,
             email:req.body.email,
             mobile:req.body.mobile,
             whatsapp:req.body.whatsapp,
             gst:req.body.gst,
             services:req.body.services,
             status:req.body.status 
    };

    var payload = {
      notification: {
        title: "User added",
        body: "{nam} added in database."
      },  
      data: {
        account: "Savings",
        balance: "$3020.25"
      } 
    };

   var options = {
       priority: "high"
    };

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                              if(err){
                                  console.log("Error",err);
                              }
                              else{

                                const coll = client.db("Aamku_connect").collection("AllRetailers");
                                coll.insertOne(data,(err,resp) => {

                                          if(err){
                                              console.log("Error",err);
                                          }
                                          else{
                                            res.send("Data added");
                                          }
                                });
                              }
    });

});

module.exports = router;