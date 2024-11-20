// @ts-types="npm:@types/express"
import {Router} from "npm:express";
import {checkSchema} from "npm:express-validator"
import { getUser, createUser, updateUser } from "../controllers/users_controller.ts";
import { getPlans } from "../controllers/plans_controller.ts";
import { getGoal, updateGoal } from "../controllers/goals_controller.ts";
import { createWorkout, getWorkouts, updateWorkout } from "../controllers/workouts_controller.ts";
import { userCreateSchema, validateResult, workoutCreateSchema, userUpdateSchema,goalUpdateSchema, workoutUpdateSchema } from "../middleware/validator.ts";

const router = Router()

router.get("/user/:id/plan",getPlans)

router.get("/user/:id/goal",getGoal)
router.put("/user/update",checkSchema(goalUpdateSchema),validateResult,updateGoal)

router.get("/user/:id/workout/:number", getWorkouts)
router.get("/user/:id/workout/", getWorkouts)
router.post("/user/:id/workout", checkSchema(workoutCreateSchema),validateResult, createWorkout)
router.put("/user/:id/workout", checkSchema(workoutUpdateSchema),validateResult, updateWorkout)

router.get("/user/:id",getUser)
router.put("/user", checkSchema(userUpdateSchema),validateResult, updateUser)
router.post("/user", checkSchema(userCreateSchema), validateResult, createUser)

export default router