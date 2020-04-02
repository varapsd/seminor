var mongoose = require('mongoose');
var Schema = mongoose.Schema

var evaluatorsSchema = mongoose.Schema({
    guideWeightage: {
        type: Number
    },
    pannelNum:{
        type: Number
    },
    pannelWeightage:{
        type: Number
    },
    taNum:{
        type: Number
    },
    taWeightage:{
        type: Number
    }
   
});
// Export evaluators model
 module.exports = {
     evaluators:mongoose.model('evaluators', evaluatorsSchema,"evaluators"),
     evaluatorsSchema:evaluatorsSchema

}