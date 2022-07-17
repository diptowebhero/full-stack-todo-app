//page not found handler
function notFoundHandler(req, res) {
  try {
    res.render("common/notFound", {
      title: "Not found",
      message: "Page Not found",
    });
  } catch (error) {
    res.render("common/error", { title: "Error occurred", error });
  }
}

//default error handler
function errorHandler(error, req, res, next) {
  try {
    if (res.headerSent) {
      next(error);
    }
  } catch (error) {
    res.render("common/error", { title: "Error occurred", error });
  }
}

//exports
module.exports = { notFoundHandler, errorHandler };
