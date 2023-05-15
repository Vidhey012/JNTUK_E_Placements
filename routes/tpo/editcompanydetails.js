const express = require('express');
const app = express();
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
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
     

    const stid = req.query.qid;
    const qid=new ObjectId(stid);
    yes=qid;

    if(req.query.method=="edit")
    {
     Company.findOne({_id: qid}) 
     .then(users => { 
       res.render('tpoeditcompany',{companyname: users.companyname,jobrole: users.jobrole,location: users.location,salary: users.salary,eligibility: users.eligibility, applylink: users.applylink});
     })
     .catch(err => {
       console.error(err);
     });
    }
    if(req.query.method=="delete")
    {
        Company.deleteOne({_id: yes})
        .then(result => {
          console.log(result);
          if (result.deletedCount === 1) {
              res.redirect('/tpodisplaycompany');
          } 
        })
        .catch(err => {
          console.log(err);
        });
    }
    });

router.post('/', async (req, res) => {
    const user = await Company.findOne({ _id: yes });
    user.companyname =req.body.companyname;
    user.jobrole = req.body.jobrole;
    user.salary = req.body.salary;
    user.location = req.body.location;
    user.eligibility = req.body.eligibility;
    user.applylink = req.body.applylink;
    await user.save();
   res.redirect('/tpodisplaycompany');
 
});

module.exports = router;
