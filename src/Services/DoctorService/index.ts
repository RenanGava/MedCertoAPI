import { prisma } from "../../prisma/prisma";
import { DoctorRepository } from "../../Repository/Doctor";

interface ICreateDoctor {
  userId: string;
  crm: string;
  specialty: string;
  socialMedia: string;
}

export class DoctorService {
  private doctorRepo: DoctorRepository;

  constructor() {
    this.doctorRepo = new DoctorRepository();
  }

  async handleCreateDoctor(data: ICreateDoctor) {
    const user = await this.doctorRepo.createDoctor(data);
    return user;
  }

  async hanldeFindOneService(userId: string) {
    const doctor = await prisma.doctor.findFirst({
      where: {
        user_id: userId,
      },
      select:{
        id: true, 
        crm: true,
        specialty: true, 
        socialMedia: true,
        user: {
            omit: {
                password: true
            }
        }
      }
    });

    return doctor;
  }

  async handleFindAllDoctors() {
    const doctor = await prisma.doctor.findMany({
        select:{
            id: true, 
            crm: true,
            socialMedia: true,
            specialty: true,
            user:{
                omit:{
                    password: true
                }
            }
        }
    })
    return doctor;
  }

 
}
