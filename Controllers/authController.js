import { StatusCodes } from "http-status-codes"
import User from "../models/userModel.js"
import { hashPassword, comparePassword } from "../utils/passwordUtils.js"
import { UnauthenticatedError } from "../Errors/customeErrors.js"
import { createJWT } from "../utils/tokenUtils.js"

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
    if (!isValideUser) throw new UnauthenticatedError("invalid credentials")

    const token = createJWT({ userId: user._id, role: user.role })
    const oneDay = 24*60*60*1000
    res.cookie("token",token ,{
        httpOnly : true ,
        expires : new Date(Date.now()+oneDay)
    })

res.status(StatusCodes.CREATED).json({message: "User loged in"})
}

export const logOut = (req,res)=>{
    res.cookie("token", "logOut", {
        httpOnly : true ,
        expires : new Date(Date.now()) 
    })
    res.status(StatusCodes.OK).json({message : "User loged out"})
}