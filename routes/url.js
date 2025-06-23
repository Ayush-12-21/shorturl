const express = require("express");
const router = express.Router();

const { handleGenerateNewShortURL,handleRedirect ,handleGetAnalytics} = require("../controller/url.js");

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirect);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
