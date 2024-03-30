//
console.clear();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({ windowMs: 1 * 60 * 1000, max: 20 });
const CONNECTdatabase = require("./connection_DB");
const app = express();
require("dotenv").config(); // Loads environment variables from the .env file into process.env
const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI; // uses the URI from the .env file // make sure it matches the varaible in Railway

CONNECTdatabase(uri);
app.use(cors()); // let React communicate with backend
app.use(limiter); // 20 requests per minute from same ip, prevent abuse of your API
app.use(logger("dev")); // Logging middleware to log HTTP requests, which is useful for debugging
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Built-in middlewares to parse incoming request bodies in JSON and URL-encoded format
app.use(cookieParser()); // Parses cookies attached to the client request object
app.use(compression()); // Compresses response bodies to reduce response sizes and improve load times
app.use(
  helmet.contentSecurityPolicy({
    // Sets various HTTP headers to help protect your app from common vulnerabilities
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

app.use("/", require("./routes/index"));

// Custom middleware for catching 404 errors and forwarding to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// General error handler.
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//
