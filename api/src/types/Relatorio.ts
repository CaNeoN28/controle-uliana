export default interface Relatorio {
	data_inicial?: string,
	data_final?: string,
	produtos: {
		nome: string,
		valor: string,
		preco_medio: number,
		vendas: {
			dia: string,
			quantidade: number,
			valor: number
		}[]
	}[]
}