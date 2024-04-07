import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import dbConnection from "./Database/dbConnection.js";

const app = express();

app.use(express.json())

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    dbConnection()
  console.log(`Server is running on port ${process.env.PORT}`);
});
