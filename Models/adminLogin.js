var mongoose = require('mongoose');
var adminLoginSchema = mongoose.Schema({
    aId: {
        type: String
    },
    userName:{
        type: String
    },
    password:{
        type: String
    }
   
});

// Export adminLoginModel model
module.exports ={

    AdminLogin:mongoose.model('AdminLogin', adminLoginSchema,"admin_logins"),
    adminLoginSchema:adminLoginSchema
   }
