import Express from "express";
import { login, logout, signup } from "../Controller/auth.controller.js";

const router = Express.Router();

router.post("/login",login);

router.post("/signup",signup);

router.post("/logout",logout);

export default router;
