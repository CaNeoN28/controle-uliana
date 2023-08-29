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

		const produtos = await ProdutoModel.find({}).sort({ nome: 1 });

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
					_id: 1,
				},
			},
		]);

		let produtosRelatorio: ProdutoRelatorio[] = produtos.map((produto) => {
			const vendas = vendasData.map((vendaData) => {
				const valores: {quantidade: number, total: number}[] = []

				let quantidade = 0
				let valor = 0

				vendaData.vendas.map((venda: Venda) => {
					const rp = venda.relacao_produtos.find((p) => {
						const id = p.produto.toString();

						return produto.id == id;
					});

					if (rp) {
						valores.push({
							quantidade: rp.quantidade,
							total: rp.total
						})
					}
				})

				if(valores.length > 0){
					const {quantidade: q, total: t} = valores.reduce((prev, curr) => {
						const total = curr.total * curr.quantidade

						return{
							quantidade: prev.quantidade + curr.quantidade,
							total: prev.total + curr.total
						}
					})

					quantidade = q
					valor = t / q
				}

				console.log({
					produto: produto.nome,
					quantidade,
					valor: valor
				})

				return {
					dia: vendaData._id,
					quantidade: quantidade,
					valor: Number(valor.toFixed(2)),
				};
			});

			return {
				nome: produto.nome,
				preco_medio: 0,
				total: 0,
				vendas: vendas,
			};
		});

		relatorio.produtos = produtosRelatorio;

		return relatorio;
	};
}
