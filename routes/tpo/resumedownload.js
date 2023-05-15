const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const ejs = require('ejs')
const pdf =require('html-pdf')
const path = require('path')
const router = express.Router();
const puppeter =require('puppeteer')
const fs=require('fs')
app.set('view engine', 'ejs');
app.set('views',path.join('../../','views'))


const { User } = require('../../models/registermodel');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.post('/', (req, res) => {

    const template = fs.readFileSync('../../views/resume-template.ejs','utf-8')
    const data = {}
    
})
module.exports = router;

