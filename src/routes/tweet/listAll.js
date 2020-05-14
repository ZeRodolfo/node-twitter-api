const { Router } = require("express");

const auth = require("../../middlewares/auth");

const Tweet = require("../../models/Tweet");

const router = new Router();

// Encontrar todos os tweets
router.get("/tweets", auth, async (req, res, next) => {
  try {
    const tweets = await Tweet.find().populate('owner');
    res.status(200).send(tweets);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

module.exports = router;
