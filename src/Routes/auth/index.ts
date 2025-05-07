import { Router } from 'express'
import { AuthController } from '../../Controllers/Auth' 




const authRouter = Router()
const authController = new AuthController()


authRouter.post('/create', authController.handleCreateUser)
authRouter.post('/login', authController.handleLogin)
authRouter.get('/refresh-token', authController.handleRefreshToken)




export default authRouter