const express = require("express");
const URL = require("../model/url"); // Add this import

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("home", { urls: allUrls });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/signup",(req,res)=>{
    return res.render("signup");
});
router.get("/login",(req,res)=>{
    return res.render("login");
});

module.exports = router;