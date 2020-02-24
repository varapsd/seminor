var mongoose = require('mongoose');
var Schema = mongoose.Schema
var teacherSchema = mongoose.Schema({
    teacherID: {
        type: String
    },
    teacherName:{
        type: String
    },
    major_students:[String],
    minor_students:[String],
    seminar_students:[String],
    major_teams:[String],
    minor_teams:[String],
    seminar_teams:[String],
});
// Export Teacher model
 module.exports = {
     Teacher:mongoose.model('Teacher', teacherSchema,"Teachers"),
     teacherSchema:teacherSchema

}