const {
  loginPageHandler,
  signupPageHandler,
  signupHandler,
  loginHandler,
  logOutHandler,
} = require("../controller/auth/auth");

const { Router } = require("express");
const { authChecker } = require("../middleware/auth/authMiddleware");
const authRouter = Router();

//sign up page handler
authRouter.get("/signup", authChecker, signupPageHandler);

//sign up handler
authRouter.post("/signup", signupHandler);

//login page handler
authRouter.get("/login", authChecker, loginPageHandler);

//login handler
authRouter.post("/login", loginHandler);

//logout handler
authRouter.get("/logout", logOutHandler);

module.exports = authRouter;
