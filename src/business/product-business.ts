import { db } from "../database/baseDatabase"

export class ProductBusiness {
    public getProducts = async (q: string | undefined) => {
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

            return output;
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

            return output;
        }
    }
}