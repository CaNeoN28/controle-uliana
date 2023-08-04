import { Router } from "express";
import ControllerProdutos from "../controllers/produtos.controller";

const produtosRoutes = Router();

produtosRoutes
	.route("/produtos")
	.post(ControllerProdutos.post)
	.get(ControllerProdutos.get);

export default produtosRoutes;
