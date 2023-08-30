import { Router } from "express";
import ControllerRelatorio from "../controllers/relatorio.controller";

const relatorioRouter = Router()

relatorioRouter.route("/relatorio").get(ControllerRelatorio.getRelatorio)

export default relatorioRouter