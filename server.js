const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require("multer");
var cookieParser = require('cookie-parser');

const app = express();
  
const MyModel =require('./models/interview')
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use('/css', express.static("css"));
const path = require('path');

//routes import 
const StudentloginRouter = require('./routes/student/studentlogin');
app.use('/studentlogin', StudentloginRouter);

const RegisterRouter = require('./routes/student/studentregister');
app.use('/studentregister', RegisterRouter);

const CpRouter = require('./routes/student/changepassword');
app.use('/changepassword', CpRouter);

const Share = require('./routes/student/shareexperience');
app.use('/shareexperience', Share);

const AqRouter = require('./routes/student/addquery');
app.use('/addquery', AqRouter);

const SpRouter = require('./routes/student/viewstudent');
app.use('/viewstudent', SpRouter);

const EpRouter = require('./routes/student/epstudent');
app.use('/epstudent', EpRouter);

const SuRouter = require('./routes/student/updatestudent');
app.use('/updatestudent', SuRouter);

const ResponseRouter = require('./routes/student/displayresponse');
app.use('/displayresponse', ResponseRouter);

const CompanyRouter = require('./routes/student/displaycompanies');

app.use('/displaycompanies', CompanyRouter);




const TloginRouter = require('./routes/tpo/tpologin');
app.use('/tpologin', TloginRouter);

const Tfilter = require('./routes/tpo/tpofilter');
app.use('/tpofilter', Tfilter)
  ;
const TqRouter = require('./routes/tpo/tpodisplayquery');
app.use('/tpodisplayquery', TqRouter);

const AnswerRouter = require('./routes/tpo/tpoanswerquery');
app.use('/tpoanswerquery', AnswerRouter);

const TcRouter = require('./routes/tpo/tpodisplaycompany');
app.use('/tpodisplaycompany', TcRouter);

const EcRouter = require('./routes/tpo/editcompanydetails');
app.use('/editcompanydetails', EcRouter);

const AncRouter = require('./routes/tpo/tpoaddcompany');
app.use('/tpoaddcompany', AncRouter);

const ApcRouter = require('./routes/tpo/tpoaddpc');
app.use('/tpoaddpc', ApcRouter);

const NtRouter = require('./routes/tpo/tpoaddnotification');
app.use('/tpoaddnotification', NtRouter);

const resumeRouter = require('./routes/tpo/tporesumedownload');
app.use('/tporesumedownload', resumeRouter);

const StRouter = require('./routes/tpo/tpoaddselected');
app.use('/tpoaddselected', StRouter);

const DtRouter = require('./routes/tpo/tpodocuments');
app.use('/tpodocuments', DtRouter);

const NvRouter = require('./routes/student/viewnotifications');
app.use('/viewnotifications', NvRouter);

const PLoginRouter = require('./routes/pc/loginpc');
app.use('/loginpc', PLoginRouter);

const PdrRouter = require('./routes/pc/pcdisplayquery');
app.use('/pcdisplayquery', PdrRouter);

const ParRouter = require('./routes/pc/pcanswerquery');
app.use('/pcanswerquery', ParRouter);

const PcvRouter = require('./routes/pc/pcverify');
app.use('/pcverify', PcvRouter);

const PasRouter = require('./routes/pc/pcaddstudent');
app.use('/pcaddstudent', PasRouter);

const PrRouter = require('./routes/pc/pcreport');
app.use('/pcreport', PrRouter);

const FilterQuery = require('./routes/pc/filterquery');
app.use('/filterquery', FilterQuery);


//top page
app.get('/', (req, res) => {
  res.render('main');
});


//tpo middleware
app.get('/use-tpocookie', (req, res) => {

  const myCookie = req.cookies.tpo;
  if (!myCookie) {
    res.send("switch to tpo account");
    return;
  }
  res.redirect('/tpodisplayquery');
});

app.get('/tpologout', (req, res) => {
  const myCookie = req.cookies.tpo;
  if (!myCookie) {
    res.send("switch to tpo account");
    return;
  }
  res.clearCookie('tpo');
  res.render('tpologin', { errorMessage: "" });
});
//pc middleware
app.get('/use-pccookie', (req, res) => {

  const myCookie = req.cookies.pc;
  if (!myCookie) {
    res.send("switch to pc account");
    return;
  }
  res.redirect('/pcdisplayquery');
});

app.get('/viewinsights',async (req,res)=>{
  try {
    const data = await MyModel.find();
    console.log(data);
    res.render('viewinsights',{experiences:data})
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
})
app.get('/pclogout', (req, res) => {
  const myCookie = req.cookies.pc;
  if (!myCookie) {
    res.send("switch to pc account");
    return;
  }
  res.clearCookie('pc');
  res.render('pclogin', { errorMessage: "" });
});

//student middleware
app.get('/student', (req, res) => {
  /*res.sendFile(__dirname+'/studentregister.html');*/
  const myCookie = req.cookies.user;
  if (!myCookie) {
    const pccookie = req.cookies.pc;
    const tpocookie = req.cookies.tpo;
    if (!pccookie && !tpocookie) {
      res.render('student');
    }
    else {
      res.send("switch to student account");
    }

    return;
  }
  console.log("cookie is set");
  res.render('studentaq', { message: '' });
});

app.get('/use-cookie', (req, res) => {
  var newcookie = req.cookies.user;
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
    return;
  }
  console.log('Cookies: ', newcookie);

  res.redirect('/studentaq');
});

app.get('/shareexperience', (req, res) => {
  res.render("shareexperience");
})
app.post('/shareexperience', async (req, res) => {
  try {
    console.log(req.body)
    const username = req.body.username;
    const name = req.body.name;
    const jobrole = req.body.jobrole;
    const company = req.body.company
    const salary = req.body.salary
    const experiences = req.body.experiences
    const suggestions = req.body.suggestions
    const interview = new Interview({ name, username, company, jobrole, salary, experiences, suggestions });
    await interview.save();
    res.render('shareexperience', { message: "Shared Succesfully" });
  }
  catch (error) {
    res.status(400).send(error);
  }
})

app.get('/studentaq', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
    return;
  }
  res.render('studentaq', { message: '' });
})






app.get('/logout', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
    return;
  }
  res.clearCookie('user');
  res.redirect('/student');
});

app.get('/studentcp', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
    return;
  }
  res.render('studentcp', { errorMessage: '', updateMessage: '' });
});
// app.get('/forgotpassword',(req,res)=>{
//   const myCookie = req.cookies.user;
//   if(!myCookie){
//       res.send("switch to student account");
//       return;
//     }
//   res.render('forgotpassword',{errorMessage:'',updateMessage:''});
// });

app.get('/editstudentprofile', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
    return;
  }
  //res.render('editstudentprofile');
  res.redirect('/epstudent');
});

app.get('/queryresponse', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
    return;
  }
  res.redirect('/displayresponse');
  //res.render('queryresponse');
});

app.get('/selectedstudents', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
    return;
  }
  res.render('branchselector');
});

app.get('/viewcompanies', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
    return;
  }
  //res.render('viewcompanies');
  res.redirect('/displaycompanies');
});

app.get('/viewstudentprofile', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
    return;
  }
  res.redirect('/viewstudent');
  //res.render('viewstudentprofile');
});

//angular controllers integration for student module
const { Company } = require('./models/companymodel');
const { Notification } = require('./models/notificationmodel');
const { User } = require('./models/registermodel');
const { Respo } = require('./models/responsemodel');
const { Selected } = require('./models/selectedmodel');
const { Query } = require('./models/querymodel');

//viewcompanies student
app.get('/dc', (req, res) => {

  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
    return;
  }

  Company.find({})
    .then(users => {

      res.json(users);
    })
    .catch(err => {
      console.error(err);
    });

});

// app.get('/viewinsights', (req, res) => {

//   const myCookie = req.cookies.user;
//   if (!myCookie) {
//     res.send("switch to student account");
//     return;
//   }

//   Interview.find({})
//     .then(users => {

//       res.json(users);
//       // res.render(path.join(__dirname,'../../views/viewinsights.ejs'),{experiences:docs})
//     })
//     .catch(err => {
//       console.error(err);
//     });

// });

//view notifications student
app.get('/nc', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
  }
  Notification.find({})
    .then(users => {

      res.json(users);

    })
    .catch(err => {
      console.error(err);
    });
});

//display profile student
app.get('/dp', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
  }

  const username = myCookie;

  User.findOne({ username: username })
    .then((user) => {

      res.json(user);

    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occurred');
    });
});

//display query responses for students
app.get('/dresponse', (req, res) => {

  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
  }

  const username = myCookie;

  console.log('entered');

  Respo.find({ username: username })
    .then(user => {

      res.json(user);
    })
    .catch(err => {
      console.error(err);
    });
});

//branch selector 
var branchtemp;
app.post('/displayselected', (req, res) => {

  const branch = req.body.branch;

  branchtemp = branch;
  const filePath = path.join(__dirname, './public/selectedstudents.html');
  res.sendFile(filePath);
});

app.get('/displayselected', (req, res) => {
  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
  }
  Selected.find({ branch: branchtemp })
    .then(users => {

      res.json(users);
    })
    .catch(err => {
      console.error(err);
    });
});

app.get('/showeditprofile', (req, res) => {

  const myCookie = req.cookies.user;
  if (!myCookie) {
    res.send("switch to student account");
  }

  const username = myCookie;

  User.findOne({ username: username })
    .then((users) => {

      res.json(users);

    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occurred');
    });
});

//pc angular controllers
//pc display notifications queries
app.get('/pcquerydisplay', (req, res) => {
  Query.find({})
    .then(users => {

      res.json(users);
    })
    .catch(err => {
      console.error(err);
    });
});

//pc display student details
var pcstemp;
app.get('/pcshowdetails', (req, res) => {

  const myCookie = req.query.username;

  const username = myCookie;

  pcstemp = myCookie;
  console.log("pcstemp");
  console.log(pcstemp);
  const filePath = path.join(__dirname, './public/pcviewstudent.html');
  res.sendFile(filePath);

});

//pc display student details
app.get('/pcds', (req, res) => {
  const myCookie = req.cookies.pc;
  if (!myCookie) {
    res.send("switch to PC account");
  }
  User.findOne({ username: pcstemp })
    .then((user) => {

      res.json(user);

    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occurred');
    });
});

//pc display student report
app.get('/pcsr', (req, res) => {

  const myCookie = req.cookies.pc;
  if (!myCookie) {
    res.send("switch to pc account");
  }

  User.find({})
    .then(users => {

      res.json(users);
    })
    .catch(err => {
      console.error(err);
    });
});

//pc get users
app.get('/pcgetusers', (req, res) => {

  const myCookie = req.cookies.pc;
  if (!myCookie) {
    res.send("switch to PC account");
  }

  User.find({})
    .then(users => {

      res.json(users);
    })
    .catch(err => {
      console.error(err);
    });
});

//tpo view query controller
app.get('/tpovc', (req, res) => {

  const myCookie = req.cookies.tpo;
  if (!myCookie) {
    res.send("switch to TPO account");
  }

  Query.find({})
    .then(users => {

      res.json(users);
    })
    .catch(err => {
      console.error(err);
    });
});
//tpo view documents
app.get('/tpovd', (req, res) => {

  const myCookie = req.cookies.tpo;
  if (!myCookie) {
    res.send("switch to TPO account");
  }
  User.find({})
    .then(users => {

      res.json(users);
    })
    .catch(err => {
      console.error(err);
    });
});

//tpocompaydetails
app.get('/tpocd', (req, res) => {

  const myCookie = req.cookies.tpo;
  if (!myCookie) {
    res.send("switch to TPO account");
  }

  Company.find({})
    .then(users => {

      res.json(users);
    })
    .catch(err => {
      console.error(err);
    });
});

// Serve uploaded files


app.get("/filter/:branch/:gender/:course/:gpa10/:intertype/:gpa12/:cgpa/", async (req, res) => {
  console.log("called");
  const fill = {};
  if (req.params["gender"] != "null") {
    fill.gender = req.params["gender"];
  }
  if (req.params["branch"] != "null") {
    fill.branch = req.params["branch"];
  }
  if (req.params["course"] != "null") {
    fill.course = req.params["course"];
  }
  if (req.params["intertype"] != "null") {
    fill.intertype = req.params["intertype"];
  }

  const test = await User.find(fill);
  const filteredStudents = test.filter(student => {
    return parseFloat(student.cgpa) >= parseFloat(req.params["cgpa"]) && parseFloat(student.gpa10) >= parseFloat(req.params["gpa10"]) && parseFloat(student.gpa12) >= parseFloat(req.params["gpa12"]);
  });
  res.send(filteredStudents);

})

app.use("/uploads", express.static("uploads"));
function validate(req,res){
  res.json({"message":"404 Not Found"})
}
app.use(validate)
app.listen(3001, () => console.log("Server listening on port 3001"));