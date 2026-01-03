import { nanoid } from "nanoid";
import Job from "../models/jobModel.js"

let jobs = [
    { id: nanoid(), company: " Apple", position: "Frontend" },
    { id: nanoid(), company: " Google", position: "Backend" }
]


export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({})
        res.status(200).json({ jobs })
    } catch (error) {
        res.status(5000).json({ message: "Serveur error" })
    }

}

export const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body)
        res.status(201).json({ job })
    } catch (error) {
        res.status(5000).json({ message: "Serveur error" })
    }
}

export const getOneJob = async (req, res) => {
    try {
        const {id}= req.params
        const job = await Job.findById(id)
        if(!job){
           return res.status(404).json({message: "Ce job n'existe pas"})
        }
        res.status(200).json({job})

    } catch (error) {
        res.status(5000).json({ message: "Serveur error" })
    }


}

export const updateJob = async (req, res) => {
       try {
        const {id} = req.params
        const updatedJob = await Job.findByIdAndUpdate(id,req.body,{new : true})
        if (!updatedJob){
            return res.status(404).json({message : "Le job n'existe pas"})
        }
        res.status(200).json({job : updatedJob })
    } catch (error) {
        res.status(5000).json({ message: "Serveur error" })
    } 

}

export const deleteJob = async (req, res) => {
      try {
        const {id} = req.params
        const removedJob = await Job.findByIdAndDelete(id)
        if (!removedJob){
            return res.status(404).json({message : "Le job n'existe pas"})
        }
        res.status(200).json({job : removedJob})
    } catch (error) {
        res.status(5000).json({ message: "Serveur error" })
    } 

}