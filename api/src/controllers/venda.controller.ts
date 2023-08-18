import { RequestHandler } from "express";
import Venda from "../types/Venda";
import CreateVenda from "../services/create.venda.service";

export default class VendaController {
	static post: RequestHandler = async function (req, res, next) {
		try {
			const {
				cliente,
				relacao_produtos,
				valor_pago
			} : Venda = req.body

			const venda = await CreateVenda({cliente, relacao_produtos, valor_pago})

			res.status(201).send(venda)
		} catch (error) {
			next(error);
		}
	};
}
