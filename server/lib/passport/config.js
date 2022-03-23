const { Strategy: JwtStrategy } = require("passport-jwt");
const { findUserById } = require("../../db/dao/userDao");

function cookieExtractor(req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_OR_KEY
};


module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      findUserById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};