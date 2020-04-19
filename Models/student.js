var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var studentSchema= mongoose.Schema({
    studentName: {
        type: String
    },
    roll:{
        type: String
    },
    batch:{
        type: String
    },
    guideName:{
        type:String
    },
    teamFormed:{
        type:Boolean
    },
    midsemTeacher:{
        type:Number
    },
    midsemPannel1:{
        type:Number
    },
    midsemPannel2:{
        type:Number
    },
    midsemPannel3:{
        type:Number
    },
    midsemGuest:{
        type:Number
    },
    endsemTeacher:{
        type: Number
    },
    endsemPannel1:{
        type: Number
    },
    endsemPannel2:{
        type: Number
    },
    endsemPannel3:{
        type: Number
    },
    endsemGuest:{
        type: Number
    },
    grade:{
        type:String
    },
});
// Export Team model
 module.exports = {
     Student:mongoose.model('Student',studentSchema,"Students"),
}