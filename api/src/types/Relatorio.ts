export interface ProdutoRelatorio {
	nome: string;
	total: number;
	preco_medio: number;
	quantidade: number,
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
	dias: String[]
	produtos: ProdutoRelatorio[];
}
