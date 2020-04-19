var mongoose = require('mongoose');
var Schema = mongoose.Schema
var teacherSchema = mongoose.Schema({
    teacherID: {
        type: String
    },
    teacherName:{
        type: String
    },
    major_students:{type:[String]},
    major_teams:[String],
    pannel_students:[String]
});
// Export Teacher model
 module.exports = {
     Teacher:mongoose.model('Teacher', teacherSchema,"Teachers"),
     teacherSchema:teacherSchema

}