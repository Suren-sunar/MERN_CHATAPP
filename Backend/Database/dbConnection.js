import mongoose from "mongoose";
const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected succcessfully");
    })
    .catch((err) => {
      console.log("Some error occur");
    });
};

export default dbConnection;
