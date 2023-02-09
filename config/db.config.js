const mongoose=require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const connectdb = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
module.exports={connectdb}