import { nanoid } from "nanoid";

let jobs = [
    { id: nanoid(), company: " Apple", position: "Frontend" },
    { id: nanoid(), company: " Google", position: "Backend" }
]


export const getAllJobs = async  (req, res) => {
    res.status(200).json({ jobs })
}

export const createJob = async (req, res) => {
    const { company, position } = req.body
    // ---const company =req.body.company la 2 eme méthode
    if (!company || !position) {
        return res.status(400).json({ message: "veuillez entrer toutes les informations" })
    }
    const id = nanoid(10)
    const job = { id, company, position }

    jobs.push(job)
    res.status(201).json({ job })
}

export const getOneJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id)
    if (!job) {
        return res.status(404).json({ message: "Le job n'existe pas" })
    }
    res.status(200).json({ job })

}

export const updateJob = async (req, res) => {
    const { company, position } = req.body
    if (!company || !position) {
        return res.status(400).json({ message: "Veuillez remplir toutes les données" })
    }
    const id = req.params.id
    const job = jobs.find((job) => job.id === id)
    if (!job) {
        return res.status(404).json({ message: " Le job n'existe pas" })
    }

    job.company = company
    job.position = position
    res.status(200).json({ message: "job a été modifié", job })

}

export const deleteJob = async (req, res) => {
    const { id } = req.params
    const job = jobs.find((job) => job.id === id)
    if (!job) {
        return res.status(404).json({ message: " Le job n'existe pas" })
    }
    const newjobs = jobs.filter((job) => job.id !== id)
    jobs = newjobs
    res.status(200).json({message : "le poste a été supprimer"})

}