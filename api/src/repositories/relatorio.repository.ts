import Produto from "../models/Produto";
import VendaModel from "../models/Venda";
import FiltrosRelatorio from "../types/FiltrosRelatorio";

export default class RepositoryRelatorio {
	static getRelatorio = async function ({
		data_inicial,
		data_final,
	}: FiltrosRelatorio) {
		const produtos = await Produto.find();

		const filtros_data: { $gte?: string; $lte?: string } = {};
		const filtros: any = {}

		if(data_inicial || data_final){
			if (data_inicial) {
				filtros_data.$gte = data_inicial;
			}
	
			if (data_final) {
				filtros_data.$lte = data_final;
			}

			filtros.data_venda = filtros_data
		}

		const vendas = await VendaModel.find(filtros);

		console.log(filtros_data)
		return vendas
	};
}
