import { Request, Response } from "express";
import { DoctorService } from "../../Services/DoctorService";

interface ICreateDoctor {
  userId: string;
  crm: string;
  specialty: string;
  socialMedia: string;
  lat: string
  long: string
}

export class DoctorController {
  async handleCreate(req: Request, res: Response) {
    const doctorData = req.body as ICreateDoctor;
    const doctorService = new DoctorService();

    const doctor = await doctorService.handleCreateDoctor({...doctorData});

    res.status(200).json(doctor);
  }


  async handleDetails(req: Request, res: Response){
    const userId = req.userId as string
    const doctorService = new DoctorService();

    const doctor = await doctorService.hanldeFindOneService(userId)

    res.status(200).json(doctor)
  }

  async handleFindAll(req: Request, res: Response){
    const doctorService = new DoctorService();
    const doctors = await  doctorService.handleFindAllDoctors()

    res.status(200).json(doctors)

  }
}
