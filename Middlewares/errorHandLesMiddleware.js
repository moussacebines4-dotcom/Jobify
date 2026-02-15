import { StatusCodes } from "http-status-codes"

export const ErrorHandLesMIddeleware = ((err , req ,res , next)=>{
    console.log(err)
    const statusCode = err.statusCode|| StatusCodes.INTERNAL_SERVER_ERROR
    const msg = err.message || "Something went wrong"
    
    res.status(statusCode).json({message :msg})
    
})