const express = require("express");
const URL = require("../models/url");
const { restrict_to } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/urls", restrict_to(["ADMIN"]), async (req, res) =>{
  const allUrls = await URL.find({});
  return res.render('home', {
    urls: allUrls,
  });
})

router.get('/',restrict_to(["NORMAL", "ADMIN"]), async (req, res) =>{
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render('home', {
    urls: allUrls,
  });
})

router.get('/signup', (req, res) =>{
  return res.render('signup');
})

router.get('/login', (req, res) =>{
  return res.render('login');
})

module.exports = router;