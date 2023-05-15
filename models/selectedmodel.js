const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');

const router = express.Router();
app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://sarathkumar170901:RVE0ZLypkMaME1Hq@cluster0.4da1v2b.mongodb.net/jntuk', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
});

const SelectedSchema = new mongoose.Schema({
    username:{
      type: String,
      required: true,
    },
    branch:{
      type: String,
      required: true,
    },
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
    
  });
  
const Selected = mongoose.model('jobholders', SelectedSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

module.exports = {
  Selected: mongoose.model('jobholders', SelectedSchema)
};
