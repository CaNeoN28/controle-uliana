import { Router } from "express";
import produtosRoutes from "./Produtos.routes";

const appRouter = Router();

appRouter.use(produtosRoutes);

export default appRouter;
