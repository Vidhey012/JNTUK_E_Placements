const express = require('express');
const app = express();
const { ObjectId } = require('mongodb');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
const { Company } = require('../../models/companymodel');


var yes;
router.get('/',(req,res)=>{
    
    
   
    
    const myCookie = req.cookies.tpo;
    
  if(!myCookie){
      res.send("switch to tpo account");
      return;
    }
     res.render('tponewcompany',{message:''});

    
    });

router.post('/', async (req, res) => {
  const companyname = req.body.companyname;
  const jobrole = req.body.jobrole;
  const location = req.body.location;
  const salary = req.body.salary;
  const eligibility = req.body.eligibility;
  const applylink = req.body.applylink;
  const lastdate = req.body.lastdate;
  const user = new Company({companyname,jobrole,location,salary,eligibility,applylink,lastdate});
  await user.save();
  res.render('tponewcompany',{message:"New Posting added successfully"});
 
});

module.exports = router;
