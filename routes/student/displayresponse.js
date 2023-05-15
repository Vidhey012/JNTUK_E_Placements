const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
const path = require('path');
app.set('view engine', 'ejs');

const { Respo } = require('../../models/responsemodel'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/',(req,res)=>{

  const myCookie = req.cookies.user;
if(!myCookie){
    res.send("switch to student account");
  }

  const username = myCookie;
 
  const filePath = path.join(__dirname, '../../public/queryresponse.html');
  res.sendFile(filePath);
  });
  


//obsolete
  module.exports = router;
 
