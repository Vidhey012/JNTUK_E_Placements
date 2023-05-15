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

const PcSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
    },
  email:{
    type: String,
    required: true,
},
 password:{
    type: String,
    required: true,

 },
 branch:{
    type: String,
    required: true,

 },
 phone:{
    type: String,
    required: true,

 },
});

const PcLogin = mongoose.model('pcuser', PcSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

module.exports = {
  PcLogin: mongoose.model('pcuser', PcSchema)
};
