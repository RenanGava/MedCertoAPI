import { Router } from 'express'
import { DoctorController } from '../../Controllers/Doctor'
import { IsAuthenticated } from '../../middlewares/isAuthenticated'


const doctorRouter = Router()
const doctorController = new DoctorController()


doctorRouter.post("/create", doctorController.handleCreate)
doctorRouter.post("/details-doctor", IsAuthenticated, doctorController.handleDetails)
doctorRouter.get("/all", IsAuthenticated, doctorController.handleFindAll)
doctorRouter.put("/update/stars", doctorController.handleUpdateStar)




export {doctorRouter}