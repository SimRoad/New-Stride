// @deno-types="npm:@types/express"
import {Request, Response} from "npm:express";
// @deno-types="npm:@types/sequelize"
import { Model } from "npm:sequelize"
import User from "../models/users_model.ts"
import Goal from "../models/goals_model.ts";
import Plan from "../models/plans_model.ts";
import { promptPlan, AIResponse } from "../utils/ai_helper.ts";
import sequelize from "../db_setup.ts";

export const getUser = async (req:Request,res:Response)=>{
    if(req.params.id){
        const all = await User.findByPk(req.params.id)
        res.send(all)
    }
}

export const createUser = async (req:Request,res:Response)=>{
    const data = req.body
    const transaction = await sequelize.transaction()
    try {
        const user = await User.create({
            username: data.username,
            email: data.email,
            password: data.password,
            birth_date: data.birth_date,
            gender: data.gender === "male",
            height: data.height,
            weight: data.weight
        },{
            transaction: transaction
        })
        data.user_id = user.id
        await Goal.create({
            user_id: user.id,
            main_goal: data.main_goal,
            baseline_activity: data.baseline_activity,
            weight_goal: data.weight_goal
        },{
            transaction: transaction
        })
        const generatedPlans:AIResponse[] = await promptPlan(data)
        await Plan.bulkCreate(generatedPlans,{validate:true,transaction:transaction})
        await transaction.commit()
        res.send(generatedPlans)
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        res.send("Failed to create user")
    }
}

export const updateUser = (req:Request,res:Response)=>{
    const {id,...contents} = req.body
    User.update(contents,{
        where: {
            id: id
        }
    })
    res.send("Should be updated")
}