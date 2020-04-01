var mongoose = require('mongoose');
var courseDetailsSchema = mongoose.Schema({

    courseName: {
        type: String
    },
    courseCode: {
        type: String
    },
    courseInstructor: {
        type: String
    },
    courseCredits: {
        type: Number
    },
    hoursPerWeek: {
        type: Number
    }

});

module.exports = {

    courseDetails: mongoose.model('courseDetails', courseDetailsSchema, "courseDetails"),
    courseDetailsSchema: courseDetailsSchema
}
