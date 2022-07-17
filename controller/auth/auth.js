const User = require("../../model/User");
const hashStr = require("../../utilities/utilities");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const auth = {};

//sign up page controller
auth.signupPageHandler = (req, res) => {
  try {
    res.render("auth/signup");
  } catch (error) {
    throw error;
  }
};

//sign up  handler
auth.signupHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password: await hashStr(password),
    });
    await user.save();
    res.render("signupDone");
  } catch (error) {
    throw error;
  }
};

//login page controller
auth.loginPageHandler = (req, res) => {
  try {
    res.render("auth/login", {
      err: null,
      email: null,
      emailError: false,
      passwordError: false,
    });
  } catch (error) {
    throw error;
  }
};

//login handler
auth.loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (validUser) {
      const isMatched = await bcrypt.compare(password, validUser.password);
      if (isMatched) {
        const token = await jwt.sign(
          {
            email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        res.cookie("access_token", "Bearer " + token, {
          signed: true,
          httpOnly: true,
          secure: true,
        });
        res.redirect("/");
      } else {
        res.render("auth/login", {
          err: "Your Password is Wrong",
          emailError: false,
          passwordError: true,
          email,
        });
      }
    } else {
      res.render("auth/login", {
        err: "User not found",
        emailError: true,
        passwordError: false,
        email,
      });
    }
  } catch (error) {
    throw error;
  }
};

//logout handler
auth.logOutHandler = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.redirect("/login");
  } catch (error) {
    throw error;
  }
};

module.exports = auth;
