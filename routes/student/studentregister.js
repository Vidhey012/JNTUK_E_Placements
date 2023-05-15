const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require("multer");
var cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, req.body.username + "_" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


  const { User } = require('../../models/registermodel'); 



const router = express.Router();
app.set('view engine', 'ejs');


router.get('/',(req,res)=>{
    const myCookie = req.cookies.user;

    if (!myCookie) {
      const pccookie =req.cookies.pc;
      const tpocookie=req.cookies.tpo;
      if(!pccookie&&!tpocookie)
      {
          res.render('studentregister',{errorMessage:""});
          return;
      }
      else{
        res.send("switch to student account");
      }
    }  
    res.redirect('/viewnotifications');

  });


router.post("/", upload.fields([{ name: "profile", maxCount: 1 },{ name: "resume", maxCount: 1 }, { name: "offerletter", maxCount: 1 }]), async (req, res) => {
    try {
      console.log(req.body)
      const test = await User.findOne({ username: req.body.username });
      if (test) {
        var temp = req.body.username.concat("  Registration number already exists");
        res.render("studentregister",{errorMessage:temp});
       return;
        }
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;
        const gender = req.body.gender;
        const phone = req.body.phone;
        const email = req.body.email;
        const languages = req.body.language;
        const course = req.body.course;
        const branch = req.body.branch;
        const dob = req.body.dob;
        const achievements = req.body.achievements;
        const gpa10 = req.body.gpa10;
        const gpa12 = req.body.gpa12;
        const cgpa =req.body.cgpa;
        const schoool =req.body.school
        const intercollege =req.body.inter
        const certifications =req.body.certifications
        const skills =req.body.skills
        const ug1 = req.body.ug1;
        const ug2 = req.body.ug2;
        const ug3 = req.body.ug3;
        const ug4 = req.body.ug4;
        const ug5 = req.body.ug5;
        const ug6 = req.body.ug6;
        const ug7 = req.body.ug7;
        const ug8 = req.body.ug8;
        const backlogs = req.body.backlogs;
        const noofcompaniesplaced =req.body.noofcompaniesplaced
        const namesofcompaniesplaced = req.body.namesofcompanies
        const HighestPackage = req.body.HighestPackage
        const intertype =req.body.intertype
        const address =req.body.address
        const projects =req.body.project
        const offerletter =req.body.offerletter
      console.log(req.body);

    var resume="";
    var profile="";
    if(req.files["profile"][0].filename){
      profile = req.files["profile"][0].filename;
    }
      
   if(req.files["resume"][0].filename){
     resume = req.files["resume"][0].filename;
   }
      
  //  if(req.files["offerletter"][0].filename){
  //   offerletter = req.files["offerletter"][0].filename;
  //  }
     
   
  
      const user = new User({ name,username,gender,password,phone,dob,email,languages,course,branch,gpa10,intertype,gpa12,cgpa,address,
        backlogs,noofcompaniesplaced,namesofcompaniesplaced,schoool,intercollege,achievements,certifications,skills,projects,resume,profile, offerletter,HighestPackage });
      await user.save();
      res.clearCookie('pc');
      res.clearCookie('tpo');
      res.cookie('user', user.username);
 
      res.redirect('/use-cookie');
     
    } catch (error) {
      console.error(error);
      res.send("<h2>Resume upload failed!</h2>");
    }
  });

  module.exports = router;