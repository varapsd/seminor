var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var studentSchema= mongoose.Schema({
    studentName: {
        type: String
    },
    roll:{
        type: String
    },
    teamFormed:{
        type:Boolean
    },
    midsemTeacher:{
        type:Number
    },
    midsemGuest:{
        type:Number
    },
    endsemTeacher:{
        type: Number
    },
    endsemGuest:{
        type: Number
    },
    grade:{
        type:String
    },
    studentType:{
        type:String
    }
});
// Export Team model
 module.exports = {
     Student:mongoose.model('Student',studentSchema,"Students"),
}