import { StatusCodes } from "http-status-codes"
import User from "../models/userModel.js"
import { hashPassword, comparePassword } from "../utils/passwordUtils.js"
import { UnauthenticatedError } from "../Errors/customeErrors.js"

export const register = async (req, res) => {
    const hashedPassword = await hashPassword(req.body.passWord)
    req.body.passWord = hashedPassword
    const isFirstAccount = (await User.countDocuments()) === 0
    req.body.role = isFirstAccount ? "admin" : "user"
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ message: "user created" })
}
export const login = async (req, res) => {
    const user = await User.findOne({ Email: req.body.Email })
    // if (!user) throw new UnauthenticatedError("invalid credentials")

    // const isPasswordCorrect = await comparePassword(req.body.passWord, user.passWord)
    // if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials")

    const isValideUser = user && (await comparePassword(req.body.passWord, user.passWord))
    if(!isValideUser)throw new UnauthenticatedError("invalid credentials")



    res.send("login")
}