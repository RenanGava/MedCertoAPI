import express, { NextFunction, Request, Response,  } from 'express'
import * as dotenv from 'dotenv'
import mainRouter from './Routes';
import cors from 'cors'

dotenv.config()

const port = process.env.NODE_ENV == 'development' ? 3000: process.env.PORT
const app = express();

app.use(cors({
    origin: '*'
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(mainRouter)


app.listen(port, (err) =>{
    if(err){
        console.log(err)
    }
    console.log(`Server rodando na Porta: ${port}`)
})

