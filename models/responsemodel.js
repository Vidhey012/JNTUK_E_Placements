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


const QrSchema = new mongoose.Schema({
    username:{
      type: String,
      required:true,
    },
    subject: {
      type: String,
      required: true,
      minlength: 10
    },
    query: {
      type: String,
      required: true
    },
    answer:{
      type: String,
      required: true
    },
  });
  
const Respo = mongoose.model('answers', QrSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

module.exports = {
  Respo: mongoose.model('answers', QrSchema)
};