const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// FIXME: Hash the password
const UserSchema = new Schema({
    username: {
        type: String,
        default: "noname"
    },
    email: {
        type: String,
        default: "no@mail.com"
    },
    hashedPassword: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("User", UserSchema); // DB name and schema to use