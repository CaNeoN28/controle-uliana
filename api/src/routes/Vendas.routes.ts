import { Router } from "express";
import VendaController from "../controllers/venda.controller";

const vendasRouter = Router();

vendasRouter.route("/venda").post(VendaController.post);

vendasRouter.route("/venda/:id").put(VendaController.update)

vendasRouter.route("/vendas").get(VendaController.get);

export default vendasRouter;
