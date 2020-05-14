const { Router } = require("express");

const auth = require("../../middlewares/auth");

const Tweet = require("../../models/Tweet");

const router = new Router();

// Criar tweets
router.post("/tweets", auth, async (req, res, next) => {
  const { content } = req.body;

  try {
    let tweet = await Tweet.create({ owner: req.user, content });
    if (!tweet) res.status(400).send({ error: "Unable to create tweet." });

    tweet = await Tweet.findById(tweet._id).populate("owner");
    res.status(201).send(tweet);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
