const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const router = new Router();

// Login do Usuário
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username }).select("+password");

    if (!user) return res.status(400).send({ error: "Username not found." });

    // Verifica se a senha é válida
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).send({ error: "Invalid password." });

    // Criar token de validação de usuário
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
    
    user = await User.findOne({ username });

    res.header("auth-token", token).send({ user, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
