import { Router } from "express";
import produtosRoutes from "./Produtos.routes";
import vendasRouter from "./Vendas.routes";

const appRouter = Router();

appRouter.use(produtosRoutes);
appRouter.use(vendasRouter);

export default appRouter;
