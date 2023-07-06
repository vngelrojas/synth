const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan')
const cors = require('cors')
require('./auth');
// To read from .env files
dotenv.config();
const app = express();
// To log to console, delete later
app.use(morgan('dev'))
const corsOptions = 
{
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

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

app.get('/auth/failure',(req,res) =>
{
    res.send('Something went wrong..')
});

app.get('/protected',isLoggedIn,(req,res) =>
{
    res.send(`Hello`);
});

app.get('/check-auth',(req,res) =>
{
    if(req.user)
        res.json({isLoggedIn: true})
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