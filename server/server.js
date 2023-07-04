const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
require('./auth');

const app = express();


dotenv.config();
app.use(session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(passport.initialize());
app.use(passport.session());


// middleware
app.use(express.json()); // allows our server to accept json as body
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
app.get('/auth/failure',(req,res) =>{
    res.send('Something went wrong..')
})
app.get('/protected',isLoggedIn,(req,res) =>{
    res.send(`Helo ${req.user.displayName}`);
})
app.get('/logout',(req,res) =>{
    req.session.destroy();
    req.logout(()=>{ // from passport documentation
        res.redirect('/');
    });
})

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