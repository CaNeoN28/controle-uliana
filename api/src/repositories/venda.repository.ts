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

	static findVenda = async function (id: string){
		const venda = await VendaModel.findById(id)

		if(!venda)
			throw new Error("Venda não encontrada")

		return venda
	}

	static updateVenda = async function ({
		id,
		valor_pago,
	}: {
		id: string;
		valor_pago: number;
	}) {
		const venda = await VendaModel.findById(id);

		if (!venda) throw new Error("Venda não encontrada");

		venda.valor_pago = valor_pago
		venda.troco = Number((venda.valor_pago - venda.total!).toFixed(2))

		await venda.save()

		return venda
	};

	static deleteVenda = async function(id: string){
		const venda = await VendaModel.findById(id)

		if(!venda) throw new Error("Venda não encontrada")

		await venda.deleteOne()
	}
}
