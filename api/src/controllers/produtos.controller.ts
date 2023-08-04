import { RequestHandler } from "express";
import listProdutos from "../services/list.produtos.service";
import CreateProdutos from "../services/create.produtos.service";

class ControllerProdutos {
	static get: RequestHandler = async function (req, res, next) {
		try {
			const produtos = await listProdutos();

			res.send(produtos);
		} catch (error) {
			next(error);
		}
	};

	static post: RequestHandler = async function (req, res, next) {
		try {
			const data = req.body;
			const produto = await CreateProdutos(data);

			res.send(produto);
		} catch (error: any) {
			res.send(error.message);
		}
	};

	static update: RequestHandler = async function (req, res, next) {
		try {
			const { id } = req.params;
			const data = req.body;

			res.send({
				id,
				...data
			})
		} catch (error) {
			next(error);
		}
	};
}

export default ControllerProdutos;
