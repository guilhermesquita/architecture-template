import express from 'express'
import { ProductController } from '../controller/product-controller';
import { ProductBusiness } from '../business/product-business';

export const productRouter = express.Router();
const productController = new ProductController(
    new ProductBusiness()
)

productRouter.get('/', productController.getProducts)
