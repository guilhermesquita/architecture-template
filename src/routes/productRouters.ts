import express from 'express'
import { ProductController } from '../controller/product-controller';

export const productRouter = express.Router();
const productController = new ProductController()

productRouter.get('/', productController.getProducts)
