import { Router } from "express";
import { getUserProfile, login, logout, registration, updateUserProfile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

//Login
//Registration
//Logout

const authRoutes: Router = Router();

authRoutes.post("/login", login);
authRoutes.post("/registration", registration);
authRoutes.post("/logout", logout);
authRoutes.get("/profile", protect, getUserProfile)
authRoutes.put("/profile", protect, updateUserProfile)

export default authRoutes;
