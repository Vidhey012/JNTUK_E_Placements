const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const ejs = require('ejs')
const pdf = require('html-pdf')
const path = require('path')
const router = express.Router();
app.set('view engine', 'ejs');
app.set('views', path.join('../../', 'views'))

const puppeteer = require('puppeteer')
const fs = require('fs')
  

const { User } = require('../../models/registermodel');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/', (req, res) => {

    const myCookie = req.cookies.tpo;
    if (!myCookie) {
        res.send("switch to TPO account");
    }
    res.render('resumedownload', { message: '' })
});

router.post('/', (req, res) => {
    const username = req.body.username
    console.log(username)
    User.findOne({ username: username })
        .then(async (user) => {
            const username = user.username
            const profilepic = "../uploads/" + user.profile
            user.profile = profilepic
            // const filepath = path.resolve(__dirname, '../../views/resume-template.ejs')
            // const template = fs.readFileSync(filepath, 'utf-8')
            // const data = user
            // const html = ejs.render(template, data)
            // const browser = await puppeteer.launch()
            // const page = await browser.newPage()
            // await page.setContent(html)
            // await page.pdf({ format: 'A4' })
            // await browser.close()

            res.render(path.join(__dirname, '../../views/resume-template.ejs'), {
                data: user
            //     },(err,html)=>{
            //         if(err){
            //             console.log(err) 
            //         }else{
            //             pdf.create(html).toStream((err,stream)=>{
            //                 if(err){
            //                     console.log(err) 
            //                 }
            //                 else{
            //                     res.setHeader('Content-Type','application/pdf')
            //                     stream.pipe(res)
            //                 }
            //             })
            //         }
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('An error occurred');
        });
})
module.exports = router;

