const mongoose=require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const connectdb = mongoose.connect(process.env.MONGODB_URL);
module.exports={connectdb}