var jwt = require("jsonwebtoken");

async function authChecker(req, res, next) {
  try {
    if (req.signedCookies.access_token) {
      const token = req.signedCookies.access_token.split(" ")[1];
      const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
      req.email = verifyToken.email;
      if (req.url === "/login" || req.url === "/signup") {
        return res.redirect("/");
      }
      next();
    } else {
      //   res.redirect("/login");
      if (req.url === "/signup") {
        return res.render("auth/signup", {
          err: null,
          email: null,
          emailError: false,
          passwordError: false,
        });
      }
      res.render("auth/login", {
        err: null,
        email: null,
        emailError: false,
        passwordError: false,
      });
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      if (req.url === "/signup") {
        return res.render("auth/signup", {
          err: null,
          email: null,
          emailError: false,
          passwordError: false,
        });
      }
      res.render("auth/login", {
        err: null,
        email: null,
        emailError: false,
        passwordError: false,
      });
    }
    next(error);
  }
}

module.exports = { authChecker };
