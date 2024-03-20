const shortid = require("shortid");
const URL = require("../models/url");

async function handle_generate_new_short_url(req, res){
  const body = req.body;
  if(!body.url) return res.status(400).json({error: "url is required!"});
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  })

  return res.render("home", { id: shortID});
}

async function handle_get_analytics(req, res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handle_redirect_link(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
      shortId
    }, 
    {
      $push: {
        visitHistory: {
          timestamp: Date.now()
        },
      },
    });
  
    res.redirect(entry.redirectURL);
}

module.exports = {
  handle_generate_new_short_url,
  handle_get_analytics,
  handle_redirect_link,
}