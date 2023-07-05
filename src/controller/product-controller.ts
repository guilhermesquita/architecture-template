import { Request, Response } from 'express'
import { db } from '../database/baseDatabase'

export class ProductController {
    constructor() {}

    public getProducts = async (req: Request, res: Response) => {
        try {
            const q = req.query.q
    
            let output;
    
            if (q){
                output = await db("products").select().where("name", "LIKE", `%${q}%`)
            } else {
                output = await db("products").select()
            }
    
            res.status(200).send(output);
    
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send('unexpected error')
            }
        }
    }
} 
