import { Router } from "express"
import { register,login, logOut } from "../Controllers/authController.js"
import { validateRegisterInput ,validateLoginInput } from "../Middlewares/validationMiddleware.js"


const router = Router()
router.post("/register",validateRegisterInput,register)
router.post("/login",validateLoginInput,login)
router.get("/logOut",logOut)

export default router 