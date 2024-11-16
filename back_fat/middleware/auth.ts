// @ts-types="npm:@types/jsonwebtoken"
import jwt from "npm:jsonwebtoken"
import { Request, Response, NextFunction } from "npm:@types/express";

export const authToken = (req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies.jwt
    console.log(token)
    const accessToken = Deno.env.get("JWT_ACCESS_TOKEN")
    if(token && accessToken){
        try {
            jwt.verify(token, accessToken)
            next()
        } catch {
            res.sendStatus(403)
            return
        }
    }
    else
    res.sendStatus(401)
}