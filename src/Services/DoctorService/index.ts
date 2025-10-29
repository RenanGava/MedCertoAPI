import { prisma } from "../../prisma/prisma";
import { DoctorRepository } from "../../Repository/Doctor";

interface ICreateDoctor {
  userId: string;
  crm: string;
  specialty: string;
}

export class DoctorService {
  private doctorRepo

  constructor() {
    this.doctorRepo = new DoctorRepository();
  }

  async handleCreateDoctor(data: ICreateDoctor) {
    const user = await this.doctorRepo.createDoctor(data);
    return user;
  }

  async hanldeFindOneService(userId: string) {
    console.log(userId);
    
    const doctor = await prisma.doctor.findFirst({
      where: {
        user_id: userId
      },
      include:{
        user:{
          omit:{
            password: true
          },
          include:{
            address: true
          }
        },
        rate: true
      }
    });

    console.log(doctor);
    

    return doctor;
  }

  async handleFindAllDoctors() {
    const doctor = await prisma.doctor.findMany({
      include:{
        user:{
          omit:{
            password: true
          },
          include:{
            address: true
          }
        }
      }
    });
    return doctor;
  }


  async handleUpdateStars(doctor_id: string, newRating: number){
    try{
      const rate = await prisma.rate.upsert({
      where:{
        doctor_id: doctor_id
      },
      update:{
        rating: newRating
      },
      create:{
        rating: newRating,
        doctor_id: doctor_id
      }
    })

    return rate
    }catch(err){
      throw new Error('Ocorreu um Erro')
    }

  }
}
