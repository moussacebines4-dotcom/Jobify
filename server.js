import * as dotenv from "dotenv"
dotenv.config();
import express from "express"
const app = express();
import  jobRouter  from "./Routes/jobRouter.js";
import mongoose from "mongoose";



app.use(express.json()); // middleware  =>  req.body

app.use((req,res, next)=>{
    console.log(req.method ,req.url)
    next()

})


app.get("/", (req, res) => {
    res.send("Hello world!!!!")
})
app.use("/api/jobs",jobRouter)

app.use((err, req, res ,next)=>{
    console.log(err)
    res.status(500).json({message : "Something went wrong"})
})


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
