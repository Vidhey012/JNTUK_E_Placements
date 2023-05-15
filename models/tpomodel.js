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

const TpoSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
},
 password:{
    type: String,
    required: true,

 }
});

const TpoLogin = mongoose.model('tpouser', TpoSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

module.exports = {
  TpoLogin: mongoose.model('tpouser', TpoSchema)
};