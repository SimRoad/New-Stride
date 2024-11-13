// @deno-types="npm:@types/express"
import {Request, Response} from "npm:express";
import Goal from "../models/goals_model.ts"
import { ResponseHelper, updateMessage } from "../utils/response.ts";

export const getGoal = async (req:Request,res:Response)=>{
    const goal = await Goal.findOne({
        where:{
            user_id: req.params.id
        }
    })
    res.status(200).send(goal)
}

export const updateGoal = async (req:Request, res:Response)=>{
    const {user_id,...contents} = req.body
    const [rows] = await Goal.update(contents,{where:{user_id:user_id},fields:Object.keys(contents)})
    const {status,message} = updateMessage("Goal",rows)
    res.status(status).send(new ResponseHelper(message,{rowsUpdated: rows}))
}