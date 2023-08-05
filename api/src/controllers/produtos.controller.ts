import { RequestHandler } from "express";
import listProdutos from "../services/list.produtos.service";
import CreateProdutos from "../services/create.produtos.service";
import UpdateProduto from "../services/update.produto.service";
import DeleteProduto from "../services/delete.produto.service";
import FindProduto from "../services/find.produtos.service";

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
			next(error);
		}
	};

	static getOne: RequestHandler = async function (req, res, next) {
		try {
			const { id } = req.params;

			const produto = await FindProduto(id)

			res.send(produto)
		} catch (error) {
			next(error);
		}
	};

	static update: RequestHandler = async function (req, res, next) {
		try {
			const { id } = req.params;
			const data = req.body;

			const produto = await UpdateProduto(data, id);

			res.send(produto);
		} catch (error) {
			next(error);
		}
	};

	static delete: RequestHandler = async function (req, res, next) {
		try {
			const { id } = req.params;

			await DeleteProduto(id);

			res.status(204).send();
		} catch (error) {
			next(error);
		}
	};
}

export default ControllerProdutos;
