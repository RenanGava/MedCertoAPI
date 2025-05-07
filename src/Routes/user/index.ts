import { Router } from 'express'
import { UserController } from '../../Controllers/User'
import { IsAuthenticated } from '../../middlewares/isAuthenticated'


const userRouter = Router()
const userController = new UserController()



userRouter.get('/datails-user', IsAuthenticated, userController.handleFindOne)
userRouter.post('/scheduling/create', IsAuthenticated, userController.handleCalendarController)
userRouter.get('/scheduling/findAll', IsAuthenticated, userController.handleFindAllShedules)



export { userRouter }