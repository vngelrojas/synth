const dotenv = require('dotenv');
const passport = require('passport');
const User = require('./models/User'); 
const Preset = require('./models/Preset');


dotenv.config();
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy
({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) 
  {
    User.findOrCreate({ googleId: profile.id ,displayName: profile.displayName}, function (err, user) 
    {
     if(err)
     {
        return done(err);
     }
     else if(user)
     {
        return done(null,user);
     }
     else
     {
        const newUser = new User({googleId: profile.id, displayName: profile.displayName});
        newUser.save(function(err,user)
        {
            if(err)
            {
                return done(err);
            }
            else
            {
                return done(null,user);
            }
        })
     }
    });
  }
));

passport.serializeUser((user,done)=> 
{
    done(null,user);
});

passport.deserializeUser((user,done)=> 
{
    done(null,user);
});

