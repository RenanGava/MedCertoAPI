import { prisma } from "../../prisma/prisma";

interface ICreateDoctor {
  userId: string;
  crm: string;
  specialty: string;
}

export class DoctorRepository {
  async createDoctor({
    crm,
    specialty,
    userId,
  }: ICreateDoctor) {
    
    const doctor = await prisma.doctor.create({
      data: {
        user_id: userId,
        crm: crm,
        specialty: specialty,
        rate:{
          create:{
            rating: 0
          }
        }
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
        rate: true,
      }
    });

    return doctor;
  }

  async findOne(userId: string) {
    const doctor = await prisma.doctor.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        user: {
          omit: {
            password: true,
          },
        },
      },
    });

    if (doctor) {
      return doctor;
    }
  }
}
