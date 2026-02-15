import { Router } from "express";
const router = Router()
import { getAllJobs, createJob, getOneJob, updateJob , deleteJob } from "../Controllers/jobController.js";
import { validateJobInput, validateIdParam } from "../Middlewares/validationMiddleware.js";

router.get("/", getAllJobs)
router.get("/:id",validateIdParam ,getOneJob)
router.post("/",validateJobInput,createJob)
router.patch("/:id",validateIdParam,validateJobInput,updateJob)
router.delete("/:id",validateIdParam,deleteJob)

// router.route("/").get(getAllJobs).post(createJob)    parce qu'il ont le meme chemin

//router.route("/:id").get(getonejob).patch(ypdateJob).delete(deleteJob)

export default router