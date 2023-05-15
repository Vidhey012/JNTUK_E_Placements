const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
const { Query } = require('../../models/querymodel'); 



router.post('/', async (req, res) => {
  const username = req.cookies.user;
  const subject = req.body.subject;
  const query = req.body.message;

  

  
  const user = new Query({username,subject,query});
  await user.save();

  res.render('studentaq',{message:"Query Sent"});
});

module.exports = router;
