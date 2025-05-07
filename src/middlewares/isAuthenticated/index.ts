import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import { GenerateTokenService } from "../../Services/GenerateTokenService";

export function IsAuthenticated(req: Request, res: Response, next: NextFunction){

    const authToken = req.headers.authorization as string

    const [, token] = authToken?.split(" ")
    const secretKey = process.env.JWT_ENCODE as Secret;

    try {
        verify(token, secretKey)
        const userId = GenerateTokenService.decodeJWT(token)

        req.userId = userId
        
        next()
        return 

    } catch (error) {
        res.status(401).json({
            message: 'Token Invalid'
        })
        return 
    }
}