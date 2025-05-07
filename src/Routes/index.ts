import { Router } from 'express'
import authRouter from './auth'
import { userRouter } from './user'
import { doctorRouter } from './doctor'



const mainRouter = Router()

// rotas de autenticacao
mainRouter.use('/auth', authRouter)
mainRouter.use('/users', userRouter)
mainRouter.use('/doctors', doctorRouter)




export default mainRouter