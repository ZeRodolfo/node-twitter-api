const { Router } = require("express");

const auth = require("../../middlewares/auth");
const User = require("../../models/User");

const router = new Router();

router.post("/users/me/update", auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    const user = await User.findById(req.user._id);

    user.name = name;
    user.description = description;

    if (!!req.files) {
      // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      const avatar = req.files.avatar;
      const cover = req.files.cover;

      if (!!avatar) {
        const filenameAvatar = `avatars/${avatar.name}`;
        const avatarDir = `./uploads/${filenameAvatar}`;
        avatar.mv(avatarDir);

        user.avatar = filenameAvatar;
      }

      if (!!cover) {
        const filenameCover = `covers/${cover.name}`;
        const coverDir = `./uploads/${filenameCover}`;
        cover.mv(coverDir);

        user.cover = filenameCover;
      }
    }

    user.save();

    req.user = user;

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
