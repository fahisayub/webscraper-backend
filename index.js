const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const { connectdb } = require("./config/db.config");
const { urlRouter } = require("./routes/url.route");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Web Page Scraper!");
});

app.use('/scrapurl', urlRouter);

 connectdb().then(async () => {
  try {
    app.listen(PORT, () => {

      console.log(`listening on port ${PORT}`);
    })
    console.log("Connected To MongoDB");

  } catch (e) {
    console.log(404, "Couldn't connect");

  }
})
