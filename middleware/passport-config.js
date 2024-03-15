

import { Strategy as JwtStrategy,ExtractJwt} from "passport-jwt";
import { Org } from "../models/Organaization.js";
import { User } from "../models/Users.js";


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

export const  configurePassport =  (passport) => {
   passport.use("org",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      console.log("jwt_payload--->org",jwt_payload)
      const user = await Org.findOne({_id: jwt_payload.credInfo.id});
      console.log(user)
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );

  passport.use("user",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      console.log("jwt_payload--->usr",jwt_payload)
      const user = await User.findOne({_id: jwt_payload.credInfo.id});
      console.log(user)
      if (user) {
        return done(null, user);
      }
 
      return done(null, false);
    })
  );

  passport.use("admin",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      console.log("jwt_payload--->adm",jwt_payload)
      const user = await User.findOne({_id: jwt_payload.credInfo.id});
      console.log(user)
      if (user.role === 'admin') {
        return done(null, user);
      }
 
      return done(null, false);
    })
  );
};


