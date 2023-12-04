const mongoose = require("mongoose");
// const config = require(".src/config/express");
// const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNACAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

// connecting to mongoDB

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => console.log("DB connection succesful"));

// SERVER
// Port
const port = process.env.PORT || 8000;
// const host = "localhost";

const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
