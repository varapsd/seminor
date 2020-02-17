var mongoose = require('mongoose');
var teacherLoginSchema = mongoose.Schema({
    tId: {
        type: String
    },
    userName:{
        type: String
    },
    password:{
        type: String
    }
   
});

// Export teacherLoginModel model
module.exports ={

    TeacherLogin:mongoose.model('TeacherLogin', teacherLoginSchema,"teacher_logins"),
    teacherLoginSchema:teacherLoginSchema
   }
