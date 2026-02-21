import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name : String,
    Email : String ,
    passWord: String,
    LastName: {
        type : String,
        default : "LastName"
    },
    Location : {
        type : String,
        default :" My city"
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default :"user"
    }
},{timestamps : true})
 // pour recuperer l'objet sans mot de passe
userSchema.methods.toJSON = function(){
    var obj = this.toObject();
    delete obj.passWord
    return obj
}

export default mongoose.model("User",userSchema)