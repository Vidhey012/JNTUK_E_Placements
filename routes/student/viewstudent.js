const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
app.set('view engine', 'ejs');
const path = require('path');

const { User } = require('../../models/registermodel'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/',(req,res)=>{

  const myCookie = req.cookies.user;
  if(!myCookie){
      res.send("switch to student account");
      return;
    }

    const filePath = path.join(__dirname, '../../public/viewstudentprofile.html');
  res.sendFile(filePath);
  });
  



  module.exports = router;
 
