const { Router } = require("express");

const auth = require("../../middlewares/auth");

const User = require("../../models/User");

const router = new Router();

// Atualizar follow específico
router.put("/follows/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const userFollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (currentUser._id.toString() !== userFollow._id.toString()) {
      const userAlreadyFollowed = currentUser.followers.some(
        (follow) => follow.toString() == userFollow._id.toString()
      );

      if (userAlreadyFollowed) {
        currentUser.followers = currentUser.followers.filter(
          (follow) => follow.toString() != userFollow._id.toString()
        );
      } else {
        currentUser.followers.push(userFollow._id.toString());
      }

      await currentUser.save();
    }

    res.status(200).send(currentUser);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
