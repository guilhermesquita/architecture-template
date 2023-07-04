import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/baseDatabase'


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => console.log('listening on http://localhost/3003'))

app.get('/ping', (_req: Request, res: Response) => {
    try {
        res.send('pong')
    } catch (error) {
        res.status(500).send('Erro inesperado')
    }
})

app.get('/products', async (_req: Request, res: Response) => {
    try {

        const output = await db("products").select()
        res.status(200).send(output)

    } catch (error) {
        res.status(500).send('Erro inesperado')
    }
})
