var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var studentSchema= mongoose.Schema({
    studentName: {
        type: String
    },
    roll:{
        type: String
    },
    midsemTotal:{
        type: Number
    },
    endsemTotal:{
        type: Number
    },
    studentType:{
        type:String
    }
});
// Export Team model
 module.exports = {
     Student:mongoose.model('Student',studentSchema,"Students"),
}