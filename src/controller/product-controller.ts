import { Request, Response } from 'express'
import { db } from '../database/baseDatabase'

export class ProductController {
    constructor() {}

    public getProducts = async (req: Request, res: Response) => {
        try {
            const q = req.query.q
        
            if (q){
                const productsDb = await db("products").select().where("name", "LIKE", `%${q}%`)
                const brandsDb = await db("brands").select()

                const getBrands = (brand_id: string) => {
                    const brand = brandsDb.find((brand)=>{
                        return brand.id === brand_id
                    })

                    return{
                        id: brand_id,
                        name: brand.name
                    }
                }

                const output = productsDb.map((product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        brand: getBrands(product.cd_brand)
                    }
                })

                res.status(200).send(output);
            } else {
                const productsDb = await db("products").select()
                const brandsDb = await db("brands").select() 

                const getBrands = (brand_id:string) => {
                    const brand = brandsDb.find((brand)=>{
                        return brand.id === brand_id
                    })

                    return{
                        id: brand_id,
                        name: brand.name
                    }
                }

                const output = productsDb.map((product) =>{
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        brand: getBrands(product.cd_brand), 
                    }
                })

                res.status(200).send(output);
            }
    
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send('unexpected error')
            }
        }
    }
} 
