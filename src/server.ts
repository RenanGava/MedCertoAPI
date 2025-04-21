import express from 'express'
import * as dotenv from 'dotenv'
// import cors from 'co'

dotenv.config()


const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const port = process.env.NODE_ENV == 'development' ? 3000: process.env.PORT

app.get('/', (req, res) => {

    
})


app.listen(port, (err) =>{
    if(err){
        console.log(err)
    }

    console.log(`Server rodando na Porta: ${port}`);
    
})

