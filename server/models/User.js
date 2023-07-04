const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const UserSchema = mongoose.Schema({
    googleId:
    {
        type: String,
        required: true,
    },
    displayName:
    {
        type: String,
        required: true,
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('User',UserSchema);