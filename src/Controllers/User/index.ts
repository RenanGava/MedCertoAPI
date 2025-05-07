import { Request, Response } from "express";
import { UserService } from "../../Services/UserService";


export class UserController{
    
    async handleFindOne(req: Request, res: Response){
        const userId = req.userId as string

        const userService = new UserService()

        const user = await userService.hanldeFindOneService(userId)
        console.log(user);
        

        res.status(200).json(user)
        return
    }

    async handleCalendarController(req: Request, res: Response){
        const userService = new UserService()
        const userId = req.userId as string
        const timeScheduling = req.body.timeScheduling as string
        const doctorId = req.body.doctor_id as string

        const calendar = await userService.handleCalendar(userId, timeScheduling, doctorId)

        res.status(200).json(calendar)


    }

    async handleFindAllShedules(req: Request, res: Response){
        const userId = req.userId as string
        const userService = new UserService()

        const allShedules = await userService.handleFindAllSchedules(userId)

        res.status(200).json(allShedules)


    }
}