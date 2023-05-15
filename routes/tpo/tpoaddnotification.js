const express = require('express');
const app = express();
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
const { Notification } = require('../../models/notificationmodel');


var yes;
router.get('/',(req,res)=>{
    
    
   
    
    const myCookie = req.cookies.tpo;
    
  if(!myCookie){
      res.send("switch to tpo account");
      return;
    }
     res.render('addnotification',{message:''});

    
    });

router.post('/', async (req, res) => {
  const companyname = req.body.companyname;
  const jobrole = req.body.jobrole;
  const location = req.body.location;
  const salary = req.body.salary;
  const eligibility = req.body.eligibility;
  const interviewdate = req.body.interviewdate;
  const message = req.body.message;
  const user = new Notification({companyname,jobrole,location,salary,eligibility,interviewdate,message});
  await user.save();
  res.render('addpc',{message:"New notification sent"});
 
});

module.exports = router;
