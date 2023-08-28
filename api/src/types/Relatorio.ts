export interface ProdutoRelatorio {
	nome: string;
	total: number;
	preco_medio: number;
	vendas: {
		dia: string;
		quantidade: number;
		valor: number;
	}[];
}

export default interface Relatorio {
	data_inicial?: string;
	data_final?: string;
	produtos: ProdutoRelatorio[];
}
