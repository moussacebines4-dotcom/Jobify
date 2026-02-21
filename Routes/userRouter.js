import { Router } from "express";
import { getCurrentUser, getApplicationStats, UpdateUser } from "../Controllers/userController.js";
import { authorizePermesion } from "../Middlewares/authMiddleware.js";

const router = Router()
router.get("/current-user",getCurrentUser)
router.get("/admin/app-stats",authorizePermesion("admin"),getApplicationStats)
router.get("/update-user",UpdateUser)

export default router
