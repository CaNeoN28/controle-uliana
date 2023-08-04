import { Router } from "express";
import ControllerProdutos from "../controllers/produtos.controller";

const produtosRoutes = Router();

produtosRoutes
	.route("/produtos")
	.post(ControllerProdutos.post)
	.get(ControllerProdutos.get);

produtosRoutes
	.route("/produto/:id")
	.put(ControllerProdutos.update)

export default produtosRoutes;
