const express = require('express');
const app = express();
const { ObjectId } = require('mongodb');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
const { PcLogin } = require('../../models/pcmodel');


var yes;
router.get('/',(req,res)=>{
    
    
   
    
    const myCookie = req.cookies.tpo;
    
  if(!myCookie){
      res.send("switch to tpo account");
      return;
    }
     res.render('addpc',{message:''});

    
    });

router.post('/', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const branch = req.body.branch;
  const phone = req.body.phone;
  const user = new PcLogin({name,email,password,branch,phone});
  await user.save();
  res.render('addpc',{message:"New Coordinator added successfully"});
 
});

module.exports = router;
