// @ts-types="npm:@types/express"
import {Router} from "npm:express";
import { loginController } from "../controllers/auth_controller.ts";

const router = Router()

router.post("/auth/login",loginController)
router.post("/auth/refresh")

export default router