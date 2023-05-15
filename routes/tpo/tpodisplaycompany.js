const express = require('express');
const app = express();
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
app.set('view engine', 'ejs');
const path = require('path');

const { Company } = require('../../models/companymodel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/',(req,res)=>{

  const myCookie = req.cookies.tpo;
if(!myCookie){
    res.send("switch to TPO account");
  }
  
  const filePath = path.join(__dirname, '../../public/tpocompanydetails.html');
  res.sendFile(filePath);

  
  });
  



  module.exports = router;
 
