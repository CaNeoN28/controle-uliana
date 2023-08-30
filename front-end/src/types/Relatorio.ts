export interface ProdutoRelatorio {
	nome: string;
	quantidade: number,
	preco_medio: number;
	total: number;
	vendas: {
		dia: string;
		quantidade: number;
		valor: number,
		total: number;
	}[];
}

export default interface Relatorio {
	data_inicial?: string;
	data_final?: string;
	dias: string[]
	produtos: ProdutoRelatorio[];
}
