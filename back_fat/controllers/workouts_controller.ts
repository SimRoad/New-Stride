// @deno-types="npm:@types/express"
import {Request, Response} from "npm:express";
import Workout from "../models/workouts_model.ts"
import { ResponseHelper, updateMessage } from "../utils/response.ts";

const floorLimit = (limit:number)=>{
    if(limit >= 50) return 50
    if(limit >= 30) return 30
    return 10
}

export const getWorkouts = async (req:Request,res:Response)=>{
    const limit = floorLimit(Number(req.params.number ?? 10))
    console.log(req.params.id)
    const workouts = await Workout.findAll({
        where:{
            user_id: Number(req.params.id)
        },
        order:[['createdAt','DESC']],
        limit: limit
    })
    res.status(200).send(workouts)
}

export const createWorkout = (req:Request,res:Response)=>{
    const {name,user_id,type,duration,repetition,weight,intensity} = req.body
    try {
        const workout = Workout.create({
            user_id: user_id,
            name: name,
            type: type,
            duration: duration,
            repetition: repetition,
            weight: weight,
            intensity:intensity
        })
        res.status(201).send(new ResponseHelper(`Succesfully created user ${name}`,{id:workout.id,user_id}))
    } catch (error) {
        console.error(error)
        res.sendStatus(400)
    }
}

export const updateWorkout = (req:Request,res:Response)=>{
    const {id,...contents} = req.body
    const [rows] = Workout.update(contents,{
        where:{
            id:id
        },
        fields: Object.keys(contents)
    })
    const {status,message} = updateMessage("Workouts",rows)
    res.status(status).send(new ResponseHelper(message,{rowsUpdated: rows}))
}