const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
const { LoginUser } = require('../../models/usermodel'); 

console.log("Cp");


router.post('/', async (req, res) => {
  const username = req.cookies.user;
  const newPassword = req.body.newpassword;

  // Find the user with the given username
  const user = await LoginUser.findOne({ username: username });
  if (!user) {
    res.send("user check");
    return;
  }

  // Check if the current password matches the password in the database
 
  if (newPassword==user.password) {
    res.render('studentcp',{errorMessage:"Same new password as current password",updateMessage:""});
    return;
  }

  
  user.password = newPassword;
  await user.save();

  res.render('studentcp',{errorMessage:"",updateMessage:"New Password Updated"});
});

module.exports = router;
