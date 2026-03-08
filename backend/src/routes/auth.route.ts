import express from "express";
import { signUp, logIn, logOut, updateProfile } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.ts";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);


router.put("/update-profile" , protectRoute , updateProfile)
export default router;
