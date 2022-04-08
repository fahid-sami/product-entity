import { ProductService } from "../services"
import { Request, Response } from "express";

const service = new ProductService();

export class ProductController {

    getCategories = async (req: Request, res: Response) => {
        try {
            res.send(await service.getCategories(req.params.parentId))
        } catch (error) {
            res.status(400)
            res.send({ error })
        }
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            res.send(await service.getProducts(req.params.state))
        } catch (error) {
            res.status(400)
            res.send({ error })
        }
    }

    transferState = async (req: Request, res: Response) => {
        try {
            res.send(await service.transferState(req.params.productId, req.params.updatedState))
        } catch (error) {
            res.status(400)
            res.send({ error })
        }
    }
}
