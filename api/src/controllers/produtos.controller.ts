import { RequestHandler } from "express";

class ControllerProdutos {
	static get: RequestHandler = async function (req, res, next) {
		try {
			res.send("Produtos");
		} catch (error) {
			next(error);
		}
	};
}

export default ControllerProdutos;
