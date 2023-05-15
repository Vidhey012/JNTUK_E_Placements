const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
const { LoginUser } = require('../../models/usermodel'); 

console.log("Fp");
router.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword');
  });
  
  router.post('/forgotpassword', (req, res) => {
    const username = req.body.username;
    LoginUser.findOne({ username: username })
      .then((user) => {
        if (!user) {
          res.render('forgotpassword', { errorMessage: "User does not exist" });
          return;
        }
  
        // Generate a new password and update it in the database
        const newPassword = generateNewPassword(); // implement generateNewPassword function
        user.password = newPassword;
        user.save()
          .then(() => {
            // Send the new password to the user's email address
            sendNewPasswordToEmail(user.email, newPassword); // implement sendNewPasswordToEmail function
            res.render('forgotpassword', { successMessage: "New password has been sent to your email address" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send('An error occurred');
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('An error occurred');
      });
  });
  