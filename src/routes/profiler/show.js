const { Router } = require("express");

const User = require("../../models/User");

const router = new Router();

router.get("/profilers", async (req, res) => {
  try {
    const user = !!req.query.id
      ? await User.findOne({ username: req.query.id }).populate("followers").sort("-createdAt")
      : await User.findOne().populate("followers").sort("-createdAt");

    if (!user) res.status(400).send({ error: "User not found." });

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
