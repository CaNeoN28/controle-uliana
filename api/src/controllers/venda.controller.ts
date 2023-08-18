import { RequestHandler } from "express";
import Venda from "../types/Venda";
import CreateVenda from "../services/create.venda.service";
import ListVendas from "../services/list.vendas.service";
import UpdateVenda from "../services/update.venda.service";

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
			const cliente = (req.query.cliente as string) || "";
			const divida = req.query.divida;

			const vendas = await ListVendas({ cliente, divida });

			res.status(200).send(vendas);
		} catch (error) {
			next(error);
		}
	};

	static update: RequestHandler = async function (req, res, next) {
		try {
			const { id } = req.params;
			const { valor_pago } = req.body;

			const venda = await UpdateVenda({
				id, 
				valor_pago,
			});

			res.status(200).send(venda)
		} catch (error) {
			next(error);
		}
	};
}
