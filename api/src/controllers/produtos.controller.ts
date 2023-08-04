import { RequestHandler } from "express";
import listProdutos from "../services/list.produtos.service";

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
			res.send("Post produtos");
		} catch (error) {
			next(error);
		}
	};
}

export default ControllerProdutos;
