const express = require('express');
const app = express();
const { ObjectId } = require('mongodb');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
const { Query } = require('../../models/querymodel');
const { Respo } = require('../../models/responsemodel'); 

var yes;
router.get('/',(req,res)=>{
    
    
   
    console.log('entered tpo query');
    const myCookie = req.cookies.tpo;
    
  if(!myCookie){
      res.send("switch to tpo account");
      return;
    }
    
    const stid = req.query.qid;
    const qid=new ObjectId(stid);
    yes=qid;
     Query.findOne({_id: qid}) 
     .then(users => {
       
       
       res.render('answerquery',{username: users.username,subject: users.subject,query: users.query});
     })
     .catch(err => {
       console.error(err);
     });
    });

router.post('/', async (req, res) => {
  const username = req.body.username;
  const subject = req.body.subject;
  const query = req.body.query;
  const answer = req.body.answer;
  const user = new Respo({username,subject,query,answer});
  await user.save();
  Query.deleteOne({_id: yes})
  .then(result => {
    console.log(result);
    if (result.deletedCount === 1) {
        res.redirect('/tpodisplayquery');
    } 
  })
  .catch(err => {
    console.log(err);
  });
 
});

module.exports = router;
