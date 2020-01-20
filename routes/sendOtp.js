const express = require('express');
const Nexmo = require('nexmo');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const nexmo = new Nexmo({
    apiKey: process.env.APIKEY,
    apiSecret: process.env.APISECRET
  });
  
  const dburl = process.env.URL;
  
   router.use(bodyParser.json());
   router.use(bodyParser.urlencoded({extended: true}));
