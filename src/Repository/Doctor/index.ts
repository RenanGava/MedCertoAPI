import { prisma } from "../../prisma/prisma";

interface ICreateDoctor{
  userId: string,
  crm: string,
  specialty: string,
  socialMedia: string

}

export class DoctorRepository {
  async createDoctor({ crm, socialMedia, specialty, userId }: ICreateDoctor) {
    const doctor  = await prisma.doctor.create({
      data:{
        user_id: userId,
        crm: crm,
        socialMedia: socialMedia,
        specialty: specialty
      },
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

    return doctor
  }

  async findOne(userId: string) {
    const doctor = await prisma.doctor.findUnique({
      where: {
        user_id: userId,
      },
      select:{
        user:{
          omit:{
            password: true
          }
        }
      }
    });

    if (doctor) {
      return doctor
    }
  }
}
