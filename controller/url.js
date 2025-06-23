const shortid = require("shortid");
const URL = require("../model/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortID = shortid.generate(); 

  await URL.create({
    shortId: shortID,
    redirectURL: body.url, 
    visitHistory: [],
    createdBy:req.user._id,
  });
  return res.render("home",{
    id:shortID,
  });
}

async function handleRedirect(req, res) {
  const shortId = req.params.shortId;
  
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  // Fix: Use redirect instead of end
  return res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}


module.exports = {
  handleGenerateNewShortURL,
  handleRedirect,
  handleGetAnalytics,
};
