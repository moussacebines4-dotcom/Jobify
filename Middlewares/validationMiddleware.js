import { body, validationResult, param } from "express-validator";
import { BadRequestError, NotFoundError } from "../Errors/customeErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/contante.js";
import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js"



const withValidationErrors = (validateValues) => {
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg)
            if (errorMessages[0].startsWith("no job")) {
                throw new NotFoundError(errorMessages)
            }
            throw new BadRequestError(errorMessages)
        }
        next()
    }]
}

export const validateJobInput = withValidationErrors([
    body("company").notEmpty().withMessage("company is required"),
    body("position").notEmpty().withMessage("position is required"),
    body("jobLocation").notEmpty().withMessage("job location is required"),
    body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("Invalid status value"),
    body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type")
])

export const validateIdParam = withValidationErrors([
    param("id").custom(async (value) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value)
        if (!isValidId) {
            throw new BadRequestError("invalid mongoDb id")
        }
        const job = await Job.findById(value)
        if (!job) throw new NotFoundError("no job with this id")

    })
])

//export const validateTest = withValidationErrors([body("name").notEmpty().withMessage("name is required").isLength({min:3,max:50}).withMessage("name must be between 3 and 50 caracters")])


export const validateRegisterInput = withValidationErrors([
    body("Name").notEmpty().withMessage("Name is required"),
    body("Email").notEmpty().withMessage("email is required").isEmail().withMessage("invalide email format").custom(async (email) => {
        const user = await User.findOne({ email })
        if (user) {
            throw new BadRequestError("email alredy existe")
        }
    }),

    body("passWord").notEmpty().withMessage("pass word is required").isLength({ min: 8, max: 12 }).withMessage("pass word must be at lest 8 and 12"),
    body("Location").notEmpty().withMessage("location is required"),
    body("LastName").notEmpty().withMessage("Last Name is required ")

])

export const validateLoginInput = withValidationErrors([
    body("Email").notEmpty().withMessage("email is required").isEmail().withMessage("invalide email format"),
    body("passWord").notEmpty().withMessage("email is required")
])