import { Request, Response } from "npm:@types/express";
import User from "../models/users_model.ts";
import bcrypt from "npm:bcrypt"
import { createToken } from "../utils/jwt.ts";

export const loginController = async (req:Request,res:Response)=>{
    const {email, password} = req.body
    const user = await User.findOne({where:{email: email}})
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            res.cookie('jwt',createToken(user.id),{httpOnly:true})
            res.sendStatus(200)
            return
        }
    }else
    res.sendStatus(401)
}