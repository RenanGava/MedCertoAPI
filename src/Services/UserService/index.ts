import { prisma } from "../../prisma/prisma";
import { UserRepository } from "../../Repository/User";

interface ICreateUser {
    email: string;
    name: string;
    password: string;
    phone: string;
    IsDoctor: boolean
}

export class UserService {

    private userRepo: UserRepository

    constructor(){
        this.userRepo = new UserRepository()
    }

    async handleCreateUser(data: ICreateUser){
        const user = await this.userRepo.createUser(data)
        return user
    }

    async handleLoginService(email: string, password: string){
        const user = await this.userRepo.findOne(email, password)
        return user
    }

    async hanldeFindOneService(userId: string){
        const user = await prisma.user.findFirst({
            where:{
                id: userId
            },
            omit:{
                password: true
            }
        })

        return user
    }

    async handleCalendar(userId: string, timeScheduling: string, doctorId: string){
        const calendar = await this.userRepo.createScheduling(userId, timeScheduling, doctorId)

        return calendar
    }

    async handleFindAllSchedules(userId: string){
        const allShedules = await this.userRepo.findAllSchedules(userId)

        return allShedules
    }
}