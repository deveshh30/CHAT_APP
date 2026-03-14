import express from "express";
import { signUp, logIn, logOut, updateProfile, checkAuth } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.ts";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/logOut", logOut);

router.get("/check", protectRoute, checkAuth);
router.put("/update-profile" , protectRoute , updateProfile)
export default router;
