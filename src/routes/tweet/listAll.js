const { Router } = require("express");

const Tweet = require("../../models/Tweet");

const router = new Router();

// Encontrar todos os tweets
router.get("/tweets", async (req, res, next) => {
  try {
    const tweets = await Tweet.find().populate('owner');
    res.status(200).send(tweets);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

module.exports = router;
