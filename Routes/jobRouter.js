import { Router } from "express";
const router = Router()
import { getAllJobs, createJob, getOneJob, updateJob , deleteJob } from "../Controllers/jobController.js";

router.get("/", getAllJobs)
router.get("/:id", getOneJob)
router.post("/",createJob)
router.patch("/:id",updateJob)
router.delete("/:id",deleteJob)

// router.route("/").get(getAllJobs).post(createJob)    parce qu'il ont le meme chemin

//router.route("/:id").get(getonejob).patch(ypdateJob).delete(deleteJob)

export default router