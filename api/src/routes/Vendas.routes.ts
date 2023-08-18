import { Router } from "express";
import VendaController from "../controllers/venda.controller";

const vendasRouter = Router();

vendasRouter.route("/venda").post(VendaController.post);

export default vendasRouter;
