const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan')
const cors = require('cors')
require('./auth');
const Preset = require('./models/Preset');
const User = require('./models/User');

// To read from .env files
dotenv.config();
const app = express();
// To read json files from req body
app.use(express.json());
// To log to console, delete later
app.use(morgan('dev'))
const corsOptions = 
{
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
app.options('/save', cors(corsOptions)); // Add this line maybe delete?

// Stuff to do with google credintials
app.use(session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(passport.initialize());
app.use(passport.session());


// middleware
function isLoggedIn(req,res,next)
{
    req.user ? next() : res.sendStatus(401);
}

// Routers
app.get('/',(req,res) =>
{
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});
app.get('/auth/google', passport.authenticate('google', {scope:  ['email','profile'] } ));
app.get('/google/callback',
    passport.authenticate('google',
    {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/failure',(req,res) =>
{
    res.send('Something went wrong..')
});

app.get('/protected',isLoggedIn,(req,res) =>
{
    res.send(`Hello`);
});

app.get('/check-auth', async(req,res) =>
{
    //console.log(req.user);
    if(req.user)
    {   
        // get the user store it in 'user
        const user = await User.findOne({googleId:req.user.googleId}).exec();
        // get array of of preset ids and store it in 'presetIds'
        const presetIds = user.presets;
        // get the actual preset documents and store them 
        const presetDocuments = await Preset.find({_id:{$in:presetIds}});
        // Extract the "name" field from each preset document
        const presetNames = presetDocuments.map((preset) => preset.name);
        
        // send a json saying that the user is logged in, along with their google id, and array of preset names and array of actual preset documents
        res.json({isLoggedIn: true,googleId: req.user.googleId, presets: presetNames, presetsData:presetDocuments})
    }
    else
        res.json({isLoggedIn: false})
});

app.get('/logout',(req,res) =>
{
    req.session.destroy();
    req.logout(()=>{ // from passport documentation
        res.redirect('/');
    });
});

app.post('/save', isLoggedIn,async (req,res) => 
{

    if(req.user && req.body)
    {
        try
        {
            // find user
            const user = await User.findOne({googleId:req.user.googleId}).exec();
            // Create a preset object 
            const preset = parsePreset(req,user._id);
            // Save the preset into collection
            await preset.save();
            // Add the id of the preset object to the user's array of presets
            user.presets.push(preset._id);
            // Update the user
            await user.save();
            res.status(200).send("Nice");
        }
        catch(error)
        {
            res.status(500).send(error);
        }
    }
    else   
        res.status(500).send("Couldnt insert");
});
     

app.delete('/delete-preset',isLoggedIn,async(req,res) =>
{
    if(req.body)
    {
        // Get the name of the preset to delete
        const presetName = req.body.toDelete;
        const preset = await Preset.findOne({name:presetName});
        const presetID = preset._id;
        const result = await Preset.deleteOne({name:presetName});
        if(result)
        {
            const user = await User.findOne({googleId:req.user.googleId}).exec();
            user.presets.pull(presetID);
            await user.save();
            console.log(`Successfully deleted ${presetName}`);
            res.status(200).send("Preset Deleted");
        }
        else
        {
            res.status(500).send("No preset found");
            console.log('No file was deleted');
        }
    }
    else
        res.status(500).send("No body")
});


// Mongoose setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,
{
    // To use  ensure compatibility with the latest version of mongoose and MongoDB.
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>
{
    app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
}).catch((error) => console.log(`${error}`));


//Parse a preset POST request
function parsePreset(req,id)
{
    const newPreset = new Preset({
        name: req.body.name,
        oscillator: req.body.synth.oscillator.type,
        volume: req.body.synth.oscillator.volume,
        attack: req.body.synth.envelope.attack,
        decay: req.body.synth.envelope.decay,
        sustain: req.body.synth.envelope.sustain,
        release: req.body.synth.envelope.release,
        reverb: {
          on: req.body.reverb.on,
          wet: req.body.reverb.wet,
          decay: req.body.reverb.decay,
          preDelay: req.body.reverb.preDelay,
        },
        chorus: {
          on: req.body.chorus.on,
          wet: req.body.chorus.wet,
          frequency: req.body.chorus.frequency,
          depth: req.body.chorus.depth,
        },
        delay: {
          on: req.body.delay.on,
          wet: req.body.delay.wet,
          delayTime: req.body.delay.delayTime,
          feedback: req.body.delay.feedback,
        },
        author: id,
      });
    return newPreset;
}

