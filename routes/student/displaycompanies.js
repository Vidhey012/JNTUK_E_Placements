const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
const path = require('path');
app.set('view engine', 'ejs');

const { Company } = require('../../models/companymodel'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



router.get('/',(req,res)=>{
 console.log('gettrigger');
  const myCookie = req.cookies.user;
if(!myCookie){
    res.send("switch to student account");
    return;
  }
  const username = myCookie;
  
  const filePath = path.join(__dirname, '../../public/viewcompanies.html');
  res.sendFile(filePath);
   
  });

/*
const dcrouter = express.Router();
  dcrouter.get('/dc',(req,res)=>{

    const myCookie = req.cookies.user;
    if(!myCookie){
        res.send("switch to student account");
        return;
      }
      console.log("trigger");
    Company.find({})
   .then(users => {
     
    res.json(users);
   })
   .catch(err => {
     console.error(err);
   });
  
  });*/
  
 

  module.exports =router;
 
