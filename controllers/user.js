const User = require("../models/user");
const { set_user, get_user } = require("../service/auth");

async function handle_user_sign_up(req, res){
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handle_user_log_in(req, res){
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });
  if(!user){
    return res.render("login", {
      error: "Invalid username or password!"
    })
  }

  
  const token = set_user(user);
  res.cookie("token", token);
  return res.redirect("/");
  // return res.json({ token });
}

module.exports = {
  handle_user_sign_up,
  handle_user_log_in,
}