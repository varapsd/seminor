var mongoose = require('mongoose');
var guestLoginSchema = mongoose.Schema({

    guestName: {
        type: String
    },
    guestPass: {
        type: String
    }

});

// Export guestLoginModel model
module.exports = {

    GuestLogin: mongoose.model('GuestLogin', guestLoginSchema, "guest_logins"),
    guestLoginSchema: guestLoginSchema
}
