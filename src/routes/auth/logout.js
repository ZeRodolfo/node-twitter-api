const { Router } = require("express");

const auth = require("../../middlewares/auth");

const router = new Router();

router.post("/users/me/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
