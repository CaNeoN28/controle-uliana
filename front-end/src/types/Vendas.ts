import Produto from "./Produtos";

export default interface Venda {
	cliente: string;
	relacao_produtos: [
		{
			produto: Produto;
			valor: number;
			quantidade: number;
			total: number;
		}
	];
	total: number;
	valor_pago: number;
	troco: number;
}
