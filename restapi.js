var express = require('express')
var mongoose = require('mongoose')
var app = express();
var redis = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var client = redis.createClient();
TeacherLogin = require("./Models/teacherLogin").TeacherLogin;
Teacher = require("./Models/teacher").Teacher;
Student = require("./Models/student").Student;
courseDetails=require("./Models/courseDetails").courseDetails;
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require('body-parser');
var path = require('path')
app.use(bodyParser.urlencoded({ extended: true }));
var url = "mongodb://localhost:27017/";
var Team = require("./Models/team").Team;
var GuestLogin = require("./Models/guestLogin").GuestLogin;
var AdminLogin = require("./Models/adminLogin").AdminLogin;
var evaluators=require("./Models/evaluators").evaluators;
var majorScheme=require("./Models/majorScheme").majorScheme;
dict = {}
majorScheme = require('./Models/majorScheme').majorScheme
app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
    saveUninitialized: true,
    resave: false
}));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/minor_final');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function (callback) {
    console.log('Successfully connected to MongoDB.');
});
/*
home sends login page
*/
app.get('/', (req, res) => {
    res.render('login2.ejs')
})
let major_teams = [];
let member1 = [];
let member2 = [];
let member3 = [];
let member4 = [];


/*
* handles request to diaplay teachers home page. Teachers home page contains major project teams.
*/

app.get('/teacherHome', (req, res) => {
    Teacher.findOne({ teacherID: dict[req.sessionID] }, (err, validTeacher) => {
        if (validTeacher.major_teams.length == 0) {
            res.render("teacherHome.ejs", {
                teamNames: major_teams,
                member1: member1,
                member2: member2,
                member3: member3,
                member4: member4,
            })
        }
        else {
            for (var i = 0; i < validTeacher.major_teams.length; i++) {
                major_teams.push(validTeacher.major_teams[i]);
            }
            for (var i = 0; i < major_teams.length; i++) {
                Team.findOne({ teamName: major_teams[i] }, (err, validTeam) => {
                    member1.push(validTeam.member1);
                    member2.push(validTeam.member2);
                    member3.push(validTeam.member3);
                    member4.push(validTeam.member4);
                    if (member4.length == major_teams.length) {
                        res.render("teacherHome.ejs", {
                            teamNames: major_teams,
                            member1: member1,
                            member2: member2,
                            member3: member3,
                            member4: member4,
                        })
                    }
                })
            }
        }
    })
})

/*
* handles post request to verify cresentials
*/
app.post('/teacherLogin', (req, res) => {
    TeacherLogin.findOne({ password: req.body.p, userName: req.body.u }, (err, validTeacher) => {
        if (validTeacher == null) {
            res.send("Invalid TeacherID or Password");
            console.log("Invalid TeacherID or Password");
        }
        else {
            client.set(req.sessionID, validTeacher.tId);
            dict[req.sessionID] = validTeacher.tId;
            res.send("Success");
        }
    })

})

/*
* to allow admin login
*/
app.post('/adminLogin', (req, res) => {
    AdminLogin.findOne({ password: req.body.p, userName: req.body.u }, (err, validAdmin) => {
        if (validAdmin == null) {
            res.send("Invalid ID or Password");
            console.log("Invalid ID or Password");
        }
        else {
            client.set(req.sessionID, validAdmin.aId);
            dict[req.sessionID] = validAdmin.aId;
            res.send("Success");
        }
    })

})

app.get('/adminHome', (req, res) => {
    res.render("adminHome.ejs");
})

/*
* send a for to add a new team
*/
let freeMajorStudents = []
let majorVisited = 0;
app.get('/addMajorTeam', (req, res) => {
    Teacher.findOne({ teacherID: dict[req.sessionID] }, (err, validTeacher) => {
        for (var i = 0; i < validTeacher.major_students.length; i++) {
            Student.findOne({ roll: validTeacher.major_students[i] }, (err, validStudent) => {
                majorVisited = majorVisited + 1;
                if (validStudent.teamFormed == false) {
                    freeMajorStudents.push(validStudent.roll);

                }
            })
        }
        if (majorVisited == validTeacher.major_students.length) {
            res.render("addMajorTeam.ejs", {
                major_students: freeMajorStudents,
            })
        }
    })
})

/*
* post req to add major project team
*/
app.post('/addMajorTeam', (req, res) => {

    Teacher.findOne({ teacherID: dict[req.sessionID] }, (err, validTeacher) => {
        validTeacher.major_students.push(req.body.member1);
        validTeacher.major_students.push(req.body.member2);
        validTeacher.major_students.push(req.body.member3);
        if (req.body.member4 != "None") {
            validTeacher.major_students.push(req.body.member4);
        }
        validTeacher.major_teams.push(req.body.teamName);
        validTeacher.save();
        Student.findOne({ roll: req.body.member1 }, (err, validStudent) => {
            validStudent.teamFormed = true;
            validStudent.save()

        })
        Student.findOne({ roll: req.body.member2 }, (err, validStudent) => {
            validStudent.teamFormed = true;
            validStudent.save()

        })
        Student.findOne({ roll: req.body.member3 }, (err, validStudent) => {
            validStudent.teamFormed = true;
            validStudent.save()

        })
        if (req.body.member4 != "None") {
            Student.findOne({ roll: req.body.member4 }, (err, validStudent) => {
                validStudent.teamFormed = true;
                validStudent.save()

            })

        }
    })
    var newTeam = new Team(
        {
            teamName: req.body.teamName,
            member1: req.body.member1,
            member2: req.body.member2,
            member3: req.body.member3,
            member4: req.body.member4,
            project: req.body.project,
            description: req.body.description
        });
    newTeam.save(function (err, team) {
        if (err) return console.error(err);
    });
    res.send("added");

})

/*
* form for midsem evaluation of major project
*/

app.get('/midsemEval/:teamName', (req, res) => {
    Team.findOne({ teamName: req.params.teamName }, (err, validTeam) => {
        var member1 = validTeam.member1;
        var member2 = validTeam.member2;
        var member3 = validTeam.member3;
        var member4 = validTeam.member4;
        majorScheme.findOne({}, (err, validmajorScheme) => {
            res.render("majorMidsem.ejs", {
                member1: member1,
                member2: member2,
                member3: member3,
                member4: member4,
                fields: validmajorScheme.fields

            })
        })
    })
})

/*
* to calulate major project mid sem score
*/
app.post('/addMidsemscore', (req, res) => {
    Student.findOne({ roll: req.body.student }, (err, validStudent) => {
        if (err) console.log(err);
        else {
            validStudent.midsemTeacher = req.body.total;
            validStudent.save();
            res.send("success!")
        }
    })
})

/*
* to calulate major project end sem score
*/

app.post('/addEndsemscore', (req, res) => {
    Student.findOne({ roll: req.body.student }, (err, validStudent) => {
        if (err) console.log(err);
        else {
            validStudent.endsemTeacher = req.body.total;
            validStudent.save();
            res.send("success!")
        }
    })
})

/*
* form for endsem evaluation of major project
*/
app.get('/endsemEval/:teamName', (req, res) => {
    Team.findOne({ teamName: req.params.teamName }, (err, validTeam) => {
        var member1 = validTeam.member1;
        var member2 = validTeam.member2;
        var member3 = validTeam.member3;
        var member4 = validTeam.member4;
        majorScheme.findOne({}, (err, validmajorScheme) => {
            res.render("majorEndsem.ejs", {
                member1: member1,
                member2: member2,
                member3: member3,
                member4: member4,
                fields: validmajorScheme.fields

            })
        })
    })
})

/*
* sends form to add a guest
*/
app.get('/addGuest', (req, res) => {
    res.render("addGuest.ejs");
})

app.get('/assignStudent',(req,res)=>{
    res.render("assignStudent.ejs");
})

/*
* handle adding a new guest
*/
app.post('/addGuest', (req, res) => {
    var newGuest = new GuestLogin({
        guestName: req.body.guest,
        guestPass: req.body.guestPass
    })
    newGuest.save().then(guest => {
        res.send("Success");
    })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });


})

app.get('/setupCourse',(req,res)=>{
    res.render("coursestruct2.ejs")
})

app.get('/setCourseDetails',(req,res)=>{
    res.render("courseDetails.ejs")
})

app.post('/setCourseDetails',(req,res)=>{
    courseDetails.findOne({},(err,newCourse)=>{
            newCourse.courseName= req.body.name,
            newCourse.courseCode= req.body.code,
            newCourse.courseInstructor= req.body.instructor,
            newCourse.courseCredits= req.body.credits,
            newCourse.hoursPerWeek= req.body.hours
            newCourse.save(function (err, team) {
                if (err) return console.error(err);
            });
            res.send("added");
        });

    
    
})

app.get('/setEvaluators',(req,res)=>{
    res.render("step2.ejs");
})

app.post('/setEvaluators',(req,res)=>{
    evaluators.findOne({},(err,newEvaluators)=>{
    
        newEvaluators.guideWeightage= req.body.gw,
        newEvaluators.pannelNum=req.body.np,
        newEvaluators.pannelWeightage=req.body.pw,
        newEvaluators.taNum=req.body.nt,
        newEvaluators.taWeightage=req.body.tw
        
        newEvaluators.save(function (err, team) {
        if (err) return console.error(err);
    })
    res.send("added");
})

})

app.get('/setEvalScheme',(req,res)=>{
    res.render("step3.ejs")
})

app.post('/setEvalScheme',(req,res)=>{
    req_fields=[]
    req_fields.push(req.body.f1);
    req_fields.push(req.body.f2);
    req_fields.push(req.body.f3);
    req_fields.push(req.body.f4);
    req_fields.push(req.body.f5);
    req_fields.push(req.body.f6);
    majorScheme.findOne({},(err,newEvalScheme)=>{
        newEvalScheme.fields=req_fields,
        newEvalScheme.save(function (err, team) {
            if (err) return console.error(err);
        });
        res.send("added");
    });
})

app.get('/assign',(req,res)=>{
    res.render("step4.ejs")
})
/*
* create a server to run on port 8081
*/


app.get('/assignGuides',(req,res)=>{
    teachers=[]
    students=[]
    Teacher.find({},(err,Teachers)=>{
        for (var i = 0; i < Teachers.length; i++){
            teachers.push(Teachers[i].teacherName)
        }
        Student.find({},(err,Students)=>{
            for (var i = 0; i < Students.length; i++){
               newStud={
                   "name":Students[i].studentName,
                   "roll":Students[i].roll
               }
               students.push(newStud)
            }
            res.render("assignGuides.ejs",{teachers:teachers,students:students})
        })

    })


})












app.get('/assignPannel',(req,res)=>{
    teachers=[]
    Teacher.find({},(err,Teachers)=>{
        for (var i = 0; i < Teachers.length; i++){
           newTeacher={
               "name":Teachers[i].teacherName,
               "id":Teachers[i].teacherID
           }
           teachers.push(newTeacher)
        }
        res.render("assignPannel.ejs",{teachers:teachers})
    })
    
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("listening at http://%s:%s", host, port)
})