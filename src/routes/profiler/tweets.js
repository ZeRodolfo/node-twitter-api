const { Router } = require("express");

const Tweet = require("../../models/Tweet");

const router = new Router();

router.get("/users/:id/tweets", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Tweet.find({ owner: id });

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
