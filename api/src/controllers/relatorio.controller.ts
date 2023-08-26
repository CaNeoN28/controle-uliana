import { RequestHandler } from "express";
import GenerateRelatorio from "../services/generate.relatorio.service";

export default class ControllerRelatorio {
	static getRelatorio: RequestHandler = async function (req, res, next) {
		try {
			const { data_final, data_inicial } = req.query as {
				data_final?: string;
				data_inicial?: string;
			};

			const relatorio = await GenerateRelatorio({ data_final, data_inicial });

			res.status(200).send(relatorio)
		} catch (error) {
			next(error);
		}
	};
}
