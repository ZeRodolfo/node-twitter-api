const { Router } = require("express");

const auth = require("../../middlewares/auth");

const Tweet = require("../../models/Tweet");

const router = new Router();

// Atualizar tweet específico (like/unlike)
router.put("/tweets/:id", auth, async (req, res, next) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findById(id);
    if (!tweet) return res.status(400).send({ error: "Tweet not found." });

    if (tweet.owner === req.user._id)
      return res.status(400).send({ error: "Unable to update tweet." });

    const tweetAlreadyLiked = tweet.likes.some((like) => like == req.user._id);

    if (tweetAlreadyLiked) {
      tweet.likes = tweet.likes.filter((like) => like != req.user._id);
    } else {
      tweet.likes.push(req.user._id);
    }

    tweet.save();

    res.status(200).send(tweet);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

module.exports = router;
