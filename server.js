import * as dotenv from "dotenv"
dotenv.config();
import express from "express"
const app = express();
import  jobRouter  from "./Routes/jobRouter.js";
import mongoose from "mongoose";
import {body , validationResult} from  "express-validator"

import { ErrorHandLesMIddeleware } from "./Middlewares/errorHandLesMiddleware.js";

import authRouter from "./Routes/authRouter.js"

 


app.use(express.json()); // middleware  =>  req.body



app.use((req,res, next)=>{
    console.log(req.method ,req.url)
    next()

})
app.get("/", (req, res) => {
    res.send("Hello world!!!!")
})

// app.post("/api/test",validateTest,(req, res)=>{
//     const {name} = req.body;
//     res.json({message:`Hello ${name}`})
// })

app.use("/api/jobs",jobRouter)
app.use("/api/auth",authRouter)

// app.use("*",(req,res)=>
// res.status(404).json({message :"cette route n'existe pas"}))


app.use(ErrorHandLesMIddeleware)



const PORT = process.env.PORT || 5000;

try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connecté a la base de données")
    app.listen(PORT, () => {
    console.log(`Mon serveur tourne sur le port : ${PORT}`)

})  
}catch(error){
    console.log(error)
    process.exit(1)
}
