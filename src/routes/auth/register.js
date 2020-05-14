const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const router = new Router();

// Criar usuário
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, name, description } = req.body;
    // Verificar se username é valido
    const userExists = await User.findOne({ username });

    if (userExists)
      return res.status(400).send({ error: "Username already in use." });

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //Criar novo usuário no banco
    let user = await User.create({
      name,
      description,
      username,
      password: hash,
    });

    if (!user) return res.status(400).send({ error: "Username not created." });

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

    user = await User.findOne({ username });

    res.header("auth-token", token).send({ user, token });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

module.exports = router;
