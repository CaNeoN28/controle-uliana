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
			const data = req.body
			const produto = await CreateProdutos(data)

			res.send(produto)
		} catch (error: any) {
			res.send(error.message);
		}
	};
}

export default ControllerProdutos;
