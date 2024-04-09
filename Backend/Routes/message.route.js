import Express from "express";
import { getMessage, sendMessage } from "../Controller/message.controller.js";
import protectRoute from "../Middleware/protectRoute.js";

const router = Express.Router();

router.get("/:id",protectRoute, getMessage)
router.post("/send/:id",protectRoute,sendMessage)


export default router