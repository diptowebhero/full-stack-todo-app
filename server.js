//dependencies
const express = require("express");
const dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const authRouter = require("./routers/authRouter");
const { authChecker } = require("./middleware/auth/authMiddleware");
const todoRouter = require("./routers/todoRouter");
const indexController = require("./controller/indexController");
const PORT = process.env.PORT || 5000;

//app initialize
const app = express();
dotenv.config();
app.use(express.static("public"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

//application route
app.use(authRouter);
app.use(todoRouter);

app.get("/", authChecker, indexController);

//not found handler
app.use(notFoundHandler);

//default error handler
app.use(errorHandler);

//DB connection
mongoose
  .connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server connection is Successfully");
    });
  })
  .catch((error) => {
    console.log(error);
  });
