// import passport from "passport";
// import { Strategy } from "passport-google-oauth20";
// import config from "../config/config.js";
// import UserModel  from "../models/user.model.js";  

// passport.use(new Strategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_REDIRECT_URI
// }), async (req,accessToken, refreshToken, profile, done) => {
//     const user=await UserModel.findOne({ email: profile.emails[0].value });
//     if(user){
//         user.googleRefreshToken = refreshToken;
//         await user.save();
//         return done(null, user);
//     }


//      const newUser = new UserModel({ 
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         googleRefreshToken: refreshToken

//      });
//      await newUser.save();

//     return done(null, profile);
// })  


// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });



// passport.deserializeUser(async (id, done) => {
//     done(null,user)
// });

// export default passport; 

import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import config from "../config/config.js";
import UserModel from "../models/user.model.js";

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
    passReqToCallback: true,
    accessType:"offline",
    prompt :'consent'
}, 
async (req,accessToken, refreshToken, profile, done) => {
    try {
        const user = await UserModel.findOne({ email: profile.emails[0].value });
        if (user) {
            user.googleRefreshToken = refreshToken;
            await user.save();
            return done(null, user);
        }

        const newUser = new UserModel({ 
            name: profile.displayName,
            email: profile.emails[0].value,
            googleRefreshToken: refreshToken
        });
        await newUser.save();

        return done(null, newUser);
    } catch (err) {
        return done(err, false);
    }
}));
export default passport;
