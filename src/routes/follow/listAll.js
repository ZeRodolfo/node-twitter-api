const { Router } = require("express");

const User = require("../../models/User");

const router = new Router();

// listar follows
router.get("/follows", async (req, res) => {
  try {
    let followers = [];
    const users = await User.find();
    if (!!req.user) {
      const currentUser = await User.findById(req.user._id);

      const currentFollowers = currentUser.followers.map((item) =>
        item.toString()
      );

      followers = users.filter(
        (item) =>
          currentFollowers.indexOf(item._id.toString()) === -1 &&
          currentUser._id.toString() !== item._id.toString()
      );
    } else {
      followers = users;
    }

    res.status(200).send(followers);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
