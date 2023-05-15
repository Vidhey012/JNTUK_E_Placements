const express = require('express');
const app = express();
const { ObjectId } = require('mongodb');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
app.set('view engine', 'ejs');



const { Selected } = require('../../models/selectedmodel');
const { LoginUser } = require('../../models/usermodel');
const { Company } = require('../../models/companymodel');
const { User } = require('../../models/registermodel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
var userdata;
var companydata;
router.get('/',async (req,res)=>{

  const myCookie = req.cookies.tpo;
if(!myCookie){
    res.send("switch to TPO account");
  }

  try {
    const data1 = await LoginUser.find({});
    const data2 = await Company.find({});
    const data = { data1, data2 };
    res.render('showselected', data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
    });

   
 
    router.post('/', async (req, res) => {
        const username = req.body.username;
        const pid = req.body.posting;
        const qid=new ObjectId(pid);
       
        const studentuser = await User.findOne({ username:username });
        const user = await Company.findOne({ _id: qid });
        const companyname=user.companyname 
        const jobrole=user.jobrole
        const salary=user.salary 
        const location=user.location
        const branch=studentuser.branch
        const newss = new Selected({username,branch,companyname,jobrole,location,salary});
        await newss.save();
       
        
        res.send('<script>alert("JobHolder added successfully"); window.location.href="/tpoaddselected";</script>');
       
     
    });
  



  module.exports = router;
 
