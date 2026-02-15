import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name : String,
    Email : String ,
    passWord: String,
    LastName: {
        type : String,
        default : "LastName"
    },
    Location :{
        type : String,
        default :" My city"
    },
    role :{
        type : String,
        enum : ["user","admin"],
        default :"user"
    }
},{timestamps : true})

export default mongoose.model("User",userSchema)