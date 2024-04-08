import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dbConnection from "./Database/dbConnection.js";

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(process.env.PORT, () => {
  dbConnection();
  console.log(`Server is running on port ${process.env.PORT}`);
});
