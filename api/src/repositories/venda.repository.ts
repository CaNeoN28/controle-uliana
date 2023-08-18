import VendaModel from "../models/Venda";
import FiltrosVenda from "../types/FiltrosVenda";
import Venda from "../types/Venda";

export default class VendaRepository {
	static createVenda = async function (vendaData: Venda) {
		const venda = await VendaModel.create(vendaData);

		return venda;
	};

	static listVendas = async function ({ cliente, divida }: FiltrosVenda) {
		const filtros: { cliente?: RegExp; troco?: any } = {};

		if (cliente) filtros.cliente = new RegExp(cliente, "i");

		if (divida) filtros.troco = { $lt: 0 };

		const vendas = await VendaModel.find(filtros);

		return vendas;
	};
}
