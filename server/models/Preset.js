const mongoose = require('mongoose');

const PresetSchema = new mongoose.Schema({
    name: String,
    oscillator: String,
    volume: Number,
    attack: Number,
    decay: Number,
    sustain: Number,
    release: Number,
    reverb:
    {
        on: Boolean,
        wet: Number,
        decay: Number,
        preDelay: Number,
    },
    chorus:
    {
        on: Boolean,
        wet: Number,
        frequency: Number,
        depth: Number,
    },
    delay:
    {
        on: Boolean,
        wet: Number,
        delayTime: Number,
        feedback: Number,
    }
});

module.exports = mongoose.model('Preset',PresetSchema);