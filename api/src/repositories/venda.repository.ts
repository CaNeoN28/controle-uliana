import VendaModel from "../models/Venda"
import Venda from "../types/Venda"

export default class VendaRepository {
	static createVenda = async function(vendaData: Venda) {
		const venda = await VendaModel.create(vendaData)

		return venda
	}

	static listVendas = async function() {
		const vendas = await VendaModel.find()

		return vendas
	}
}