const { Router } = require("express");

const auth = require("./auth");
const profiler = require("./profiler");
const follow = require("./follow");
const tweet = require("./tweet");

const router = new Router();

router.use(auth.register);
router.use(auth.login);
router.use(auth.logout);
router.use(profiler.update);
router.use(profiler.tweets);
router.use(follow.update);
router.use(follow.listAll);
router.use(tweet.store);
router.use(tweet.update);
router.use(tweet.listAll);

module.exports = router;
