const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');



const router = express.Router();
app.set('view engine', 'ejs');
/*mongoose.connect('mongodb://0.0.0.0/jntuk', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
});

const LoginSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const LoginUser = mongoose.model('studentuser', LoginSchema);*/


const { LoginUser } = require('../../models/usermodel'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/',(req,res)=>{

  const myCookie = req.cookies.user;

  if(!myCookie) {
    const pccookie =req.cookies.pc;
    const tpocookie=req.cookies.tpo;
    if(!pccookie&&!tpocookie)
    {
        res.render('studentlogin',{errorMessage:""});
        return;
    }
    else{
      res.send("switch to student account");
    }
  }  
  
    res.sendFile(__dirname+"/public/studenthome.html");
  });
  
router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
    console.log(username);
    console.log(password);
  LoginUser.findOne({ username: username })
    .then((user) => {
      if (!user) {
        console.log(user.username);
        res.render('studentlogin',{errorMessage:"User does not exist"});
        return;
      }

      if (password !== user.password) {
        res.render('studentlogin',{errorMessage:"Invalid Username or Password"});
        return;
      }
      res.clearCookie('pc');
      res.clearCookie('tpo');
      res.clearCookie('user');
    res.cookie('user', user.username);
 
    res.redirect('/use-cookie');

   
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occurred');
    });
});


  module.exports = router;
 
