import VendaRepository from "../repositories/venda.repository";
import Venda from "../types/Venda";

export default async function CreateVenda(vendaData: Venda) {
	const { relacao_produtos, valor_pago, cliente } = vendaData;

	relacao_produtos.map((produto) => {
		const total = produto.quantidade * produto.valor

		produto.total	 = total
	})

	const total = relacao_produtos.reduce((prev, curr, _i) => {
		return {
			...prev,
			total: prev.total + curr.total
		}
	}).total

	const troco = Number((valor_pago - total).toFixed(2))

	const venda = await VendaRepository.createVenda({
		relacao_produtos,
		valor_pago,
		cliente,
		total,
		troco,
	});

	return venda;
}
