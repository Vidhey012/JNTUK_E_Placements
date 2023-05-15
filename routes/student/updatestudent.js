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


router.get('/', (req, res) => {
  const myCookie = req.cookies.user;

  if (!myCookie) {

    res.render('studentregister', { errorMessage: "" });
    return;
  }
  res.redirect('/studentaq', { message: '' });

});


router.post("/", upload.fields([{ name: "profile", maxCount: 1 }, { name: "resume", maxCount: 1 },  { name: "offerletter", maxCount: 1 }]), async (req, res) => {
  try {

    if (req.files["profile"]) {
      req.body.profile = req.files["profile"][0].filename;

    }

    if (req.files["resume"]) {
      //  const resume = req.files["resume"][0].filename;
      //  user.resume=resume;
      req.body.resume = req.files["resume"][0].filename;
    }
    if (req.files["offerletter"]) {
      req.body.offerletter = req.files["offerletter"][0].filename;
    }

    //  if(req.body.dob){
    //      user.dob = req.body.dob;
    //  }

    // await user.save();
    // res.send("updated");
    console.log(req.body);
    // const myquery={username: req.body.username };
    // await User.updateOne(myquery,req.body);

    User.updateOne({ "username": req.body.username }, {
      $set: {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "gpa10": req.body.gpa10,
        "gpa12": req.body.gpa12,
        "cgpa": req.body.cgpa,
        "course": req.body.course,
        "backloghistory": req.body.backlogHistory,
        "backlogs": req.body.backlogs,
        "languages":req.body.language,
        "dob": req.body.dob,
        "intertype":req.body.intertype,
        "resume": req.body.resume,
        "skills": req.body.skills,
        "certifications": req.body.certificates,
        "projects": req.body.project,
        "address": req.body.address,
        "schoool": req.body.school,
        "intercollege": req.body.inter,
        "profile": req.body.profile,
        "achievements": req.body.achievements,
        "noofcompaniesplaced": req.body.noofcompaniesplaced,
        "namesofcompaniesplaced": req.body.namesofcompanies,
        "HighestPackage": req.body.HighestPackage
      },
      $push: {
        "offerletter": req.body.offerletter
      }
    }, { new: true }).then(result => {
      console.log(result)
    })


    res.send("updated");

  } catch (error) {
    console.error(error);
    res.send("<h2>Resume upload failed!</h2>");
  }
});

module.exports = router;