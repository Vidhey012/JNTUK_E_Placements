const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');



const router = express.Router();
app.set('view engine', 'ejs');



const { TpoLogin } = require('../../models/tpomodel'); 
//const { LoginUser } = require('../../models/usermodel'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/',(req,res)=>{

  const myCookie = req.cookies.tpo;

  if (!myCookie) {
    const pccookie =req.cookies.pc;
    const tpocookie=req.cookies.user;
    if(!pccookie&&!tpocookie)
    {
        res.render('tpologin',{errorMessage:""});
    return;
    }
    else{
      res.send("switch to tpo");
    }
   
  }

   if(myCookie){res.redirect('/tpodisplayquery');}
   
  });
  
router.post('/', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
    console.log(username);
    console.log(password);
    

    // const user = new TpoLogin({ username,password });
    //   await user.save();

  
  TpoLogin.findOne({  })
    .then((user) => {
      console.log(user);
      if (!user) {
      
        res.render('tpologin',{errorMessage:"User does not exist"});
        return;
      }

      if (password !== user.password) {
        res.render('tpologin',{errorMessage:"Invalid Username or Password"});
        return;
      }

      res.clearCookie('user');
      res.clearCookie('pc');
    res.cookie('tpo', user.username);
 
    res.redirect('/use-tpocookie');

   
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occurred');
    });
});


  module.exports = router;
 
