import express, { Request, Response } from 'express'
import { db } from '../database/baseDatabase';
import { ProductController } from '../controller/product-controller';

export const productRouter = express.Router();
const productController = new ProductController()

productRouter.get('/', productController.getProducts)
