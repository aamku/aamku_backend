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
             retailer_id:req.body.retailer_id,
             name:req.body.name,
             email:req.body.email,
             store_name:req.body.store_name,
             mobile:req.body.mobile,
             whatsapp:req.body.whatsapp,
             gst:req.body.gst,
             state:req.body.state,
             city:req.body.city,
             address:req.body.address,
             pin:req.body.pin,
             status:req.body.status,
             date:req.body.date 
    };

    var payload = {
      notification: {
        title: "New retailer request",
        body: data.name + " wants to connect"
      },  
      data: {
        account: "Savings",
        balance: "$3020.25"
      } 
    };

   var options = {
       priority: "high"
    };

    let registrationToken = "fFGEV02_Ajs:APA91bF23SwG3da7pIS9aKWcw4ffl7_VfRhMv1gdY3l-QATvaxP1SlvrzXrbUOpJ0732y9ZW7XrtAKj_wmeGXISaUDzj0rY2p_7HMFBzXC_-OMjGLkoHWVQHBqQLkibJlWBFbEtFvhSV";

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                              if(err){
                                  console.log("Error",err);
                              }
                              if(!(req.body.added_by) || !(req.body.retailer_id) || !(req.body.name) || !(req.body.email) || 
                               !(req.body.store_name) || !(req.body.mobile) || !(req.body.gst) || !(req.body.state) || 
                                !(req.body.city) || !(req.body.address) || !(req.body.pin) || !(req.body.status) || !(req.body.date)){
                               
                                  return console.log({"Server response":"Field is empty"});
                              }
                              else{

                                const coll = client.db("Aamku_connect").collection("AllRetailers");
                                coll.insertOne(data,(err,resp) => {

                                          if(err){
                                              console.log("Error",err);
                                          }
                                          else{
                                            res.send("Data added");

                                            admin.messaging().sendToDevice(registrationToken,payload,options).then((response) => {

                                              console.log("response",response)
                                            }).catch((error) => {
                                               console.log("error",error);
                                            });
                                          }
                                });
                              }
    });

});

module.exports = router;