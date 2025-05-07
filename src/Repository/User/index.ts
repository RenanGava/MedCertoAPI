import dayjs from "dayjs";
import { prisma } from "../../prisma/prisma";
import { compare, hash } from "bcryptjs";

interface ICreateUser {
  email: string;
  name: string;
  password: string;
  phone: string;
  IsDoctor: boolean
}

export class UserRepository {
  async createUser({ email, name, password, phone, IsDoctor }: ICreateUser) {
    const userAlreadyExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userAlreadyExist) {
      const passHash = await hash(password, 8)

      const user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: passHash,
          phone: phone,
          isDoctor: IsDoctor ? IsDoctor : false
        },
        omit: {
          password: true,
        },
      });

      return user;
    }

    throw new Error('user already exists !')
  }

  async findOne(email: string, password: string){
    const user = await prisma.user.findUnique({
        where:{
            email: email
        }
    })

    if(!user){
        throw new Error('user not exist')
    }

    const comparePass = await compare(password, user.password)

    if(comparePass){
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        }
    }else{
        throw new Error('user or password incorrect')
    }
  }

  async createScheduling(userId: string, timeScheduling: string, doctorId: string){
    
    const time = new Date(timeScheduling)
    
    
    const createSheduling = await prisma.calendar.create({
      data:{
        doctor_id: doctorId,
        user_id: userId,
        timeScheduled: time 
      },
      select:{
        id: true,
        timeScheduled: true,
        doctor: true,
        user:{
          omit:{
            password: true
          }
        }
      }
    })

   

    return {
      id: createSheduling.id,
      timeScheduled: dayjs(createSheduling.timeScheduled).format('DD/MM/YYYY HH:mm:ss'),
      user_id: createSheduling.user.id,
      doctor_id: createSheduling.doctor.id
    }
  }

  async findAllSchedules(userId: string){
    const allShedules = await prisma.calendar.findMany({
      where:{
        user_id: userId
      },
      select:{
        id: true,
        timeScheduled: true,
        doctor: {
          select:{
            id: true,
            crm: true,
            specialty: true,
            socialMedia: true,
            user:{
              omit:{
                password: true
              }
            }
          }
        }
        
      }
    })

    return allShedules
  }
}
