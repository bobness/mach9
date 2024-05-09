const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const logger = require("morgan");
const http = require("http");
const { Pool } = require("pg");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");

const app = express();
dotenv.config({ path: "./.env" });

app.use(logger("dev"));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  max: 50, // 10 is default
  idleTimeoutMillis: 10000, // 10000 is default
  connectionTimeoutMillis: 2000, // 0 (no timeout!) is default
});

pool.on("error", (err) => {
  console.error("pg pool error: ", err);
  process.exit();
});

app.use(async (req, res, next) => {
  req.client = await pool.connect();
  next();
});

app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // console.log(err.message);

  res.status(err.status || 500).send(`Error: ${err.message}`);
});

const server = http.createServer(app);
server.listen(process.env.port || 8888);
server.on("listening", () => {
  console.log("Listening on ", server.address());
});

module.exports = app;
