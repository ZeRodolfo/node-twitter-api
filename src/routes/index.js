const { Router } = require("express");

const auth = require("./auth");
const profilerUpdate = require("./profiler/update");
const follow = require("./follow");

const router = new Router();

router.use(auth.register);
router.use(auth.login);
router.use(auth.logout);
router.use(profilerUpdate);
router.use(follow.update);
router.use(follow.listAll);

module.exports = router;
