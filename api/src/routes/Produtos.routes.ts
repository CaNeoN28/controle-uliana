import { Router } from "express";
import ControllerProdutos from "../controllers/produtos.controller";

const produtosRoutes = Router();

produtosRoutes
	.route("/produtos")
	.post(ControllerProdutos.post)
	.get(ControllerProdutos.get);

produtosRoutes
	.route("/produto/:id")
	.get(ControllerProdutos.getOne)
	.put(ControllerProdutos.update)
	.delete(ControllerProdutos.delete);

produtosRoutes.route("/produto").get(ControllerProdutos.getByCode);

export default produtosRoutes;
