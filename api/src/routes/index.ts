import { Router } from "express";
import produtosRoutes from "./Produtos.routes";
import vendasRouter from "./Vendas.routes";
import relatorioRouter from "./Relatorio.routes";

const appRouter = Router();

appRouter.use(produtosRoutes);
appRouter.use(vendasRouter);
appRouter.use(relatorioRouter)

export default appRouter;
