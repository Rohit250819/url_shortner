const jwt = require("jsonwebtoken"); 
const secret = "rohitkumar$%23-*&@"

function set_user(user){
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  }
  return jwt.sign(payload, secret);
}

function get_user(token){
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null
  }
}

module.exports = {
  set_user, 
  get_user,
}