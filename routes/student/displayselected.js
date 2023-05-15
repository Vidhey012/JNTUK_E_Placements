const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
app.set('view engine', 'ejs');

const { Selected } = require('../../models/selectedmodel'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.post('/',(req,res)=>{

   const branch = req.body.branch;
  
  
 
   Selected.find({branch: branch})
   .then(users => {
     
     res.render('selectedstudents',{users});
   })
   .catch(err => {
     console.error(err);
   });
  });
  



  module.exports = router;
 
