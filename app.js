const path = require("path");
const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const expenseRouter = require("./routes/expenseRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// -Data sanitization against noSQL query Injection
app.use(mongoSanitize());

// -Data sanaitization against XSS scripting attacks
app.use(xss());

// - Prevent parameter pollution
// app.use(hpp({
//   whitelist:
// }));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// GLOBAL MIDDLEWARE Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit request from same Api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. Please try again in an hour!",
});
app.use("/api", limiter);

// Routes
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

// MIDDLEWARES
app.use(morgan("dev"));

module.exports = app;
