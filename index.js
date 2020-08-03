const express = require('express')
const app = express()
var path = require('path');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static('images'));
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
const ig=require('./instagram');

app.get('/', function (req, res) {
  res.render('home');
})
app.post('/submit',function(req,res){
   // console.log(req.body.password)
    (async()=>{

        await ig.initialize();
        await ig.login(req.body.username,req.body.password,req.body.instaid);
        await ig.likeprocess(req.body.posts)
        debugger;
      })()
    res.render('result');
})
var port = process.env.port || 3000;
app.listen(port)