import { Request, Response } from 'express'
import { db } from '../database/baseDatabase'

export class ProductController {
    constructor() {}

    public getProducts = async (_req: Request, res: Response) => {
        try {

            const output = await db("products").select()
            res.status(200).send(output)

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send('unexpected error')
            }
        }
    }
} 
