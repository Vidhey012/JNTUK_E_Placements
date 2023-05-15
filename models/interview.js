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

const interviewSchema = new mongoose.Schema({
    name: {
        type: String,
       required: true,
    },
    username: {
        type:String,
        required: true,
    },
    company: {
        type: String,
       required: true,
    },
    jobrole: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    experiences: {
        type: String,
        required: true,
    },
    suggestions: {
        type: String,
        
    }

});


const Interview = new mongoose.model('interview', interviewSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
module.exports = mongoose.model('interview', interviewSchema);