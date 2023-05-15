const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
const Interview  = require('../../models/interview'); 

router.get('/', (req, res) => {

  // const myCookie = req.cookies.st;
  // if (!myCookie) {
  //     res.send("switch to TPO account");
  // }
  res.render('shareexperience', { message: '' })
});


router.post('/', async (req, res) => {
  try{
    console.log(req.body)
    const username = req.body.username;
    const name = req.body.name;
    const jobrole = req.body.jobrole;
    const company = req.body.company
    const salary = req.body.salary 
    const experiences =req.body.experiences 
    const suggestions =req.body.suggestions
    const interview = new Interview({name,username,company,jobrole,salary,experiences,suggestions});
    await interview.save();
    res.render('shareexperience',{message:"Shared Succesfully"});
  }
  catch(error){
res.status(400).send(error);
  }
  
  
});

module.exports = router;
