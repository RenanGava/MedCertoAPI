import dayjs from "dayjs";
import { prisma } from "../../prisma/prisma";
import { compare, hash } from "bcryptjs";

interface IAddress {
  street: string;
  neighborhood: string;
  cep: string;
  number: string;
}

interface ICreateUser {
  email: string;
  name: string;
  password: string;
  phone: string;
  isDoctor: boolean;
  address: IAddress;
}

export class UserRepository {
  async createUser({
    email,
    name,
    password,
    phone,
    isDoctor,
    address,
  }: ICreateUser) {
    const userAlreadyExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userAlreadyExist) {
      const passHash = await hash(password, 8);

      console.log({
        email,
        name,
        password,
        phone,
        isDoctor,
        address,
      });

      const user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: passHash,
          phone: phone,
          isDoctor: isDoctor,
          address: {
            create: {
              cep: address.cep,
              neighborhood: address.neighborhood,
              number: address.number,
              street: address.street,
            },
          },
        },
        omit: {
          password: true,
        },
        include: {
          address: true,
        },
      });

      return user;
    }

    throw new Error("user already exists !");
  }

  async findOne(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        address: true,
      },
    });

    if (!user) {
      throw new Error("user not exist");
    }
    const ArrayKeyValue = new Map();
    
    Object.keys(user).map((value, index, array) => {
      if (value != "password") {
        return ArrayKeyValue.set(value, Object.values(user)[index])
      }
    });

    const userFormated = Object.fromEntries(new Map(ArrayKeyValue));

    const comparePass = await compare(password, user.password);

    if (comparePass) {
      return userFormated
    } else {
      throw new Error("user or password incorrect");
    }
  }

  async createScheduling(
    userId: string,
    timeScheduling: string,
    doctorId: string
  ) {
    const time = new Date(timeScheduling);

    const createSheduling = await prisma.calendar.create({
      data: {
        doctor_id: doctorId,
        user_id: userId,
        timeScheduled: time,
      },
      select: {
        id: true,
        timeScheduled: true,
        doctor: true,
        user: {
          omit: {
            password: true,
          },
        },
      },
    });

    return {
      id: createSheduling.id,
      timeScheduled: dayjs(createSheduling.timeScheduled).format(
        "DD/MM/YYYY HH:mm:ss"
      ),
      user_id: createSheduling.user.id,
      doctor_id: createSheduling.doctor.id,
    };
  }

  async findAllSchedules(userId: string) {
    const allShedules = await prisma.calendar.findMany({
      where: {
        user_id: userId,
      },
      include:{
        doctor:{
          include:{
            user:{
              omit:{
                password: true
              }
            }
          }
        }
      }
    });

    return allShedules;
  }
}
