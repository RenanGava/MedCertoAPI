import { Router } from 'express'
import { prisma } from '../prisma/prisma'



const mainRouter = Router()


mainRouter.get('/', async (req, res) => {

    const user = await prisma.doctor.create({
        data:{
            user:{
                create:{
                    name: 'gabriela',
                    email: 'gabriela@gmail.com',
                    password: '123',
                    phone: '(28)999999999',
                    isDoctor: false,
                }
            },
            crm: '654321',
            socialMedia: 'lasei',
        },
        include:{
            user: {
                omit:{
                    password: true
                }
            }
        }
    })

    res.json(user)
    
})



export default mainRouter