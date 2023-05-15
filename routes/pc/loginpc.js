const express = require('express');
const app = express();
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');



const router = express.Router();
app.set('view engine', 'ejs');



const { PcLogin } = require('../../models/pcmodel'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/',(req,res)=>{

  const myCookie = req.cookies.pc;

  if (!myCookie) {
    const pccookie =req.cookies.tpo;
    const tpocookie=req.cookies.user;
    if(!pccookie&&!tpocookie)
    {
        res.render('pclogin',{errorMessage:""});
        return;
    }
    else{
      res.send("switch to pc");
    }
   
  }else{
   res.redirect('/pcdisplayquery');}
  });
  
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
    console.log(email);
    console.log(password);
  PcLogin.findOne({ email: email })
    .then((user) => {
      if (!user) {
       
        res.render('pclogin',{errorMessage:"User does not exist"});
        return;
      }

      if (password !== user.password) {
        res.render('pclogin',{errorMessage:"Invalid Username or Password"});
        return;
      }

      res.clearCookie('user');
      res.clearCookie('tpo');
    res.cookie('pc', user.email);
 
    res.redirect('/use-pccookie');

   
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occurred');
    });
});


  module.exports = router;
 
