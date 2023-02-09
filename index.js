const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const { connectdb } = require("./config/db.config");
const { urlRouter } = require("./routes/url.route");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Web Page Scraper!");
});

app.use('/scrapurl',urlRouter);

app.listen(port, async () => {
  try {
    await connectdb;
    console.log("Connected To MongoDB");
  } catch (e) {
    console.log(404, "Couldn't connect");
  }
  console.log(`listening on port ${port}`);
});
