import { RequestHandler } from "express";
import Venda from "../types/Venda";
import CreateVenda from "../services/create.venda.service";
import ListVendas from "../services/list.vendas.service";

export default class VendaController {
	static post: RequestHandler = async function (req, res, next) {
		try {
			const { cliente, relacao_produtos, valor_pago }: Venda = req.body;

			const venda = await CreateVenda({
				cliente,
				relacao_produtos,
				valor_pago,
			});

			res.status(201).send(venda);
		} catch (error) {
			next(error);
		}
	};

	static get: RequestHandler = async function (req, res, next) {
		try {
			const vendas = await ListVendas()

			res.status(200).send(vendas)
		} catch (error) {
			next(error);
		}
	};
}
