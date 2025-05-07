import { Request, Response } from "express";
import { UserService } from "../../Services/UserService";
import { GenerateTokenService } from "../../Services/GenerateTokenService";


interface ICreateUser {
    email: string;
    name: string;
    password: string;
    phone: string;
    IsDoctor: boolean
}


export class AuthController{

    

    async handleCreateUser(req: Request, res: Response){
        const dataUser = req.body as ICreateUser
        const userService =  new UserService()

        try{
            const user = await userService.handleCreateUser(dataUser)
            res.status(201).json(user)
        }catch(err){
            console.log(err);
            
            res.status(409).json(err)
        }
    }
    async handleLogin(req: Request, res: Response){
        const email = req.body.email as string
        const password = req.body.password as string
        const userService =  new UserService()
        const generateToken = new GenerateTokenService()

        try{
            const user = await userService.handleLoginService(email, password)
            
            res.status(200).json({
                user,
                token:{
                    jwt: await generateToken.generateJWT({payload: user.id}),
                    refreshToken: await generateToken.GenerateRefreshToken(user.id)
                }
            })
        }catch(err){
            console.log(err);
            
            res.status(404).json(err)
        }
    }

    async handleRefreshToken(req: Request, res: Response){
        const refreshTokenId = req.body.refreshTokenId as string
        // const
        const generateToken = new GenerateTokenService()
        const refreshToken = await generateToken.validateRFToken(refreshTokenId)

        const token = {
            jwt: refreshToken.jwt,
            RFT: refreshToken.RFT
        }

        res.status(200).json(token)
        return


    }
}