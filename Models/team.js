var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var teamSchema = mongoose.Schema({
    teamName: {
        type: String
    },
    member1:{
        type: String
    },
    member2:{
        type: String
    },
    member3:{
        type: String
    },
    member4:{
        type: String
    },
    teamType:{
        type:String
    },
    project:{
        type:String
    },
    description:{
        type:String
    }

    
});
// Export Team model
 module.exports = {
     Team:mongoose.model('Team', teamSchema,"Teams"),
}