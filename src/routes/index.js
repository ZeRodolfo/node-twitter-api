const { Router } = require("express");

const auth = require("./auth")

const router = new Router();

router.use(auth.register);
router.use(auth.login);
router.use(auth.logout);

module.exports = router;
