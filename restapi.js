var express=require('express')
var mongoose=require('mongoose')
var app = express();
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();
TeacherLogin=require("./Models/teacherLogin").TeacherLogin;
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require('body-parser');
var path = require('path')
app.use(bodyParser.urlencoded({ extended: true }));
var url = "mongodb://localhost:27017/";

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: true,
    resave: false
}));


app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/minor_final');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function(callback) {
        console.log('Successfully connected to MongoDB.');
});

/*
home sends login page
*/
app.get('/',(req,res)=>{
    res.render('login2.ejs')
})

app.get('/teacherHome',(req,res)=>{
    res.sendFile(path.join(__dirname+"/views/teacherHome.html"));
})

/*
* handles post request to verify cresentials
*/
app.post('/teacherLogin',(req,res)=>{
    TeacherLogin.findOne({password:req.body.p,userName:req.body.u},(err,validTeacher)=>{
        if(validTeacher==null){
            res.send("Invalid TeacherID or Password");
            console.log("Invalid TeacherID or Password");
        }
        else{
             console.log(validTeacher.tId);
             client.set(req.sessionID,validTeacher.tId);
             res.send("Success");
            }
    })

})

/*
* create a server to run on port 8081
*/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("listening at http://%s:%s", host, port)
 })