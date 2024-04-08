import Express from "express";
import { sendMessage } from "../Controller/message.controller.js";
import protectRoute from "../Middleware/protectRoute.js";

const router = Express.Router();

router.post("/send/:id",protectRoute,sendMessage)


export default router