import * as dotenv from "dotenv"
dotenv.config();
import express from "express"
const app = express();
import  jobRouter  from "./Routes/jobRouter.js";



app.use(express.json()); // middleware  =>  req.body


app.get("/", (req, res) => {
    res.send("Hello world!!!!")
})
app.use("/api/jobs",jobRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Mon serveur tourne sur le port : ${PORT}`)

})  