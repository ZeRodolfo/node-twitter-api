require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const router = require("./routes");
const middlewares = require("./middlewares");

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to the database!")
);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use(morgan("common"));

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 5 * 1024 * 1024 * 1024, //5MB max file(s) size
    },
  })
);

const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    exposedHeaders: "access-token",
  })
);

/**
 * Routes
 */
app.use(router);

/**
 * Middlewares
 */

// Middleware recurso não encontrado
app.use(middlewares.notFound);

// Middleware de tratamento de erro
app.use(middlewares.errorHandle);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
