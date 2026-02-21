import { StatusCodes } from "http-status-codes"
import User from "../models/userModel.js"
import Job from "../models/jobModel.js"

export const getCurrentUser = async(req,res)=>{
    const user = await User.findOne({_id:req.user.userId})
    const userWithOutPassword = user.toJSON()
    res.status(StatusCodes.OK).json({user : userWithOutPassword})

}

export const getApplicationStats = async(req,res)=>{
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.status(StatusCodes.OK).json({users , jobs})
}

export const UpdateUser = async(req,res)=>{
    const UpdatedUser = await User.findByIdAndUpdate(req.user.userId,req.body)
    res.status(StatusCodes.OK).json({msg : "update user"})
}