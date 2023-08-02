const mongoose = require('mongoose');
const Preset = require('./Preset')
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
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
    presets: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Preset',
    }],
    createdAt:
    {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('User',UserSchema);
