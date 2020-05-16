const { Router } = require("express");
const md5 = require('md5');

const auth = require("../../middlewares/auth");
const User = require("../../models/User");

const router = new Router();

router.put("/users/me/update", auth, async (req, res) => {
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
        let filenameAvatar = md5(`${avatar.name}/${new Date().getTime()}`)
        filenameAvatar =  `avatars/${filenameAvatar}`;
        const avatarDir = `./uploads/${filenameAvatar}`;
        avatar.mv(avatarDir);

        user.avatar = filenameAvatar;
      }

      if (!!cover) {
        let filenameCover = md5(`${cover.name}/${new Date().getTime()}`)
        filenameCover = `covers/${filenameCover}`;
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

router.put("/users/me/update-cover", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!!req.files) {
      const cover = req.files.cover;
      if (!!cover) {
        const filename = md5(`${cover.name}/${new Date().getTime()}`)
        const filenameCover = `covers/${filename}`;
        const coverDir = `./uploads/${filenameCover}`;
       
        cover.mv(coverDir);

        user.cover = filenameCover;
        user.save();

        req.user = user;
      }
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put("/users/me/update-avatar", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!!req.files) {
      const avatar = req.files.avatar;
      if (!!avatar) {
        const filename = md5(`${avatar.name}/${new Date().getTime()}`)
        const filenameAvatar = `avatars/${filename}`;
        const avatarDir = `./uploads/${filenameAvatar}`;
       
        avatar.mv(avatarDir);

        user.avatar = filenameAvatar;
        user.save();

        req.user = user;
      }
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
