const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');

const router = express.Router();
app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://sarathkumar170901:RVE0ZLypkMaME1Hq@cluster0.4da1v2b.mongodb.net/jntuk', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
}); 

const CompanySchema = new mongoose.Schema({
    companyname:{
      type: String,
      required:true,
    },
    jobrole: {
      type: String,
      required: true,
      
    },
    location: {
      type: String,
      required: true
    },
    salary:{
      type: String,
      required: true
    },
    eligibility:{
      type: String,
      required: true
    },
    applylink:{
      type: String,
      required: true
    },
    lastdate:{
      type:String,
      required: true
    },
    
  });
  
const Company = mongoose.model('companies', CompanySchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

module.exports = {
  Company: mongoose.model('companies', CompanySchema)
};
