import ProdutoModel from "../models/Produto";
import VendaModel from "../models/Venda";
import FiltrosRelatorio from "../types/FiltrosRelatorio";
import Produto from "../types/Produto";
import Relatorio, { ProdutoRelatorio } from "../types/Relatorio";
import Venda from "../types/Venda";

export default class RepositoryRelatorio {
	static getRelatorio = async function ({
		data_inicial,
		data_final,
	}: FiltrosRelatorio) {
		const relatorio: Relatorio = {
			data_final:
				data_final && !isNaN(Date.parse(data_final)) ? data_final : undefined,
			data_inicial:
				data_inicial && !isNaN(Date.parse(data_inicial))
					? data_inicial
					: undefined,
			produtos: [],
		};

		const produtos = await ProdutoModel.find({}).sort({nome: 1});

		let filtros_data: { $gte?: string; $lte?: string } | undefined = {};
		const filtros: any = {};

		if (data_inicial || data_final) {
			if (data_inicial) {
				filtros_data.$gte = data_inicial;
			}

			if (data_final) {
				filtros_data.$lte = data_final;
			}

			filtros.data_venda = filtros_data;
		} else {
			filtros_data = undefined;
		}

		const vendasData = await VendaModel.aggregate([
			{
				$match: {
					data_venda: filtros_data || { $ne: null },
				},
			},
			{
				$group: {
					_id: { $dateToString: { format: "%Y/%m/%d", date: "$data_venda" } },
					vendas: { $push: "$$ROOT" },
				},
			},
			{
				$sort: {
					_id: 1
				}
			}
		]);

		let produtosRelatorio: ProdutoRelatorio[] = produtos.map((produto) => {
			
			const vendas = vendasData.map(vendaData => {
				return {
					dia: vendaData._id,
					quantidade: 0,
					valor: 0
				}
			})
			
			return {
				nome: produto.nome,
				preco_medio: 0,
				total: 0,
				vendas: vendas,
			};
		});

		relatorio.produtos = produtosRelatorio

		return relatorio;
	};
}
