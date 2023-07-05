import { BrandDatabase } from "../database/brand-database"
import { ProductDatabase } from "../database/product-database"

export class ProductBusiness {

    constructor(
        private productDatabase: ProductDatabase,
        private brandDatabase: BrandDatabase
    ){}

    public getProducts = async (q: string | undefined) => {
        if (q){
            const productsDb = await this.productDatabase.getAllProductsByName(q)
            const brandsDb = await this.brandDatabase.getAllBrands()

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
            const productsDb = await this.productDatabase.getAllProducts()
            const brandsDb = await this.brandDatabase.getAllBrands()
            
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