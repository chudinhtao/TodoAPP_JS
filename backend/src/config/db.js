import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.STRINGCONNECTION);
    console.log("connect db success");
  } catch (error) {
    console.log("connect db fail");
    process.exit(1);
  }
};
