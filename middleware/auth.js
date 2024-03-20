const { get_user } = require("../service/auth");

//authentication
function check_for_authentication(req, res, next){
  const tokenCookie = req.cookies?.token
  req.user = null;
  if(!tokenCookie) return next();

  const token = tokenCookie;
  const user = get_user(token);

  req.user = user;
  return next();
}

//authorization
function restrict_to(roles = []){
  return function(req, res, next){
    if(!req.user) return res.redirect("/login");
    if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  };
}

module.exports = {
  check_for_authentication,
  restrict_to,
}