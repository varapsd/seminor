var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var majorSchema=mongoose.Schema({
    fields:{
        type:[String]
    }

})

// Export Team model
module.exports = {
    majorScheme:mongoose.model('majorScheme', majorSchema,"majorScheme"),
}