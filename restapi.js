var express=require('express')
var mongoose=require('mongoose')
var app = express();
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();
TeacherLogin=require("./Models/teacherLogin").TeacherLogin;
Teacher=require("./Models/teacher").Teacher;
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require('body-parser');
var path = require('path')
app.use(bodyParser.urlencoded({ extended: true }));
var url = "mongodb://localhost:27017/";
var Team=require("./Models/team").Team;
dict={}

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

/*app.get('/teacherHome',(req,res)=>{
    

   Teacher.findOne({teacherID:dict[req.sessionID]},(err,validTeacher)=>{
    res.send(validTeacher.teacherID)
    
    
})

})*/
app.get('/teacherHome',(req,res)=>{
    major_teams=[];
    member1=[];
    member2=[];
    member3=[];
    member4=[];
    Teacher.findOne({teacherID:dict[req.sessionID]},(err,validTeacher)=>{
        
        major_teams=validTeacher.major_teams;
    })
    for(var i=0;i<major_teams.length;i++){
        Team.findOne({teamName:major_teams[i].length},(err,validTeam)=>{
            console.log("hi");
            member1.push(validTeam.member1);
            member2.push(validTeam.member2);
            member3.push(validTeam.member3);
            member4.push(validTeam.member4);

        })
    }
    res.render("teacherHome.ejs",{
        
        teamNames:major_teams,
        member1:member1,
        member2:member2,
        member3:member3,
        member4:member4,



    })
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
             client.set(req.sessionID,validTeacher.tId);
             dict[req.sessionID]=validTeacher.tId;
             res.send("Success");
            }
    })

})

/*
* send a for to add a new team
*/

app.get('/addMajorTeam',(req,res)=>{
    Teacher.findOne({teacherID:dict[req.sessionID]},(err,validTeacher)=>{
        res.render("addMajorTeam.ejs",{
            major_students:validTeacher.major_students,
        })
    })
    

    
})



/*
* post req to add major project team
*/

app.post('/addMajorTeam',(req,res)=>{
    
    Teacher.findOne({teacherID:dict[req.sessionID]},(err,validTeacher)=>{
       validTeacher.major_students.push(req.body.member1);
        validTeacher.major_students.push(req.body.member2);
        validTeacher.major_students.push(req.body.member3);
        if(req.body.member4!="None"){
            validTeacher.major_students.push(req.body.member4);
        }
        validTeacher.major_teams.push(req.body.teamName);
        validTeacher.save();
      


})

    var newTeam = new Team(   
    {
        teamName:req.body.teamName,
        member1:req.body.member1,
        member2:req.body.member2,
        member3:req.body.member3,
        member4:req.body.member4,
        project:req.body.project,
        description:req.body.description
    });
 
    // save model to database
    newTeam.save(function (err, team) {
      if (err) return console.error(err);
    });
res.send("added");

})



app.get('/midsemEval',(req,res)=>{


})

/*
* create a server to run on port 8081
*/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("listening at http://%s:%s", host, port)
 })