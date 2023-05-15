const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const router = express.Router();
app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://sarathkumar170901:RVE0ZLypkMaME1Hq@cluster0.4da1v2b.mongodb.net/jntuk', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    languages: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    gpa10: {
        type: Number,
        required: true,
    },
    intertype: {
        type: String,
        required: true,
    },
    gpa12: {
        type: Number,
        required: true,
    },
    /*ug1:{
        type: Number,
        required: true,
    },
    ug2:{
        type: Number,
        required: true,
    },
    ug3:{
        type: Number,
        required: true,
    },
    ug4:{
        type: Number,
        required: true,
    },
    ug5:{
        type: Number,
        required: true,
    },
    ug6:{
        type: Number,
        default:0,
    },
    ug7:{
        type: Number,
        default:0,
    },
    ug8:{
        type: Number,
        default:0,
    },*/
    cgpa: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
        default: true,
    },
    backlogs: {
        type: Number,
        required: true,
    },
    noofcompaniesplaced: {
        type: Number,
        required: true
    },
    namesofcompaniesplaced: {
        type: String,
        required: true
    },

    schoool: {
        type: String,
        required: true,
    },
    intercollege: {
        type: String,
        required: true,
    },
    achievements: {
        type: String,
    },
    certifications: {
        type: String,
    },
    skills: {
        type: String,
    },
    projects: {
        type: String,
    },
    resume: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    offerletter: {
        type: [String],
        default: []
    },
    
});

const User = mongoose.model('studentusers', UserSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

module.exports = {
    User: mongoose.model('studentusers', UserSchema)
};