const { Router } = require("express");

const auth = require("../../middlewares/auth");

const User = require("../../models/User");

const router = new Router();

// listar follows
router.get("/follows", auth, async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const users = await User.find();

    console.log(currentUser.followers);

    const currentFollowers = currentUser.followers.map((item) =>
      item.toString()
    );

    const followers = users
      .filter(
        (item) =>
          currentFollowers.indexOf(item._id.toString()) === -1 &&
          currentUser._id.toString() !== item._id.toString()
      );
    res.status(200).send(followers);
  } catch (err) {
    res.status(400);
    next(err);
  }
});

module.exports = router;
