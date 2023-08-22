export default interface Venda {
	relacao_produtos: [{
		produto: any,
		valor: number,
		quantidade: number,
		total: number
	}],
	total?: number,
	valor_pago: number,
	troco?: number,
	cliente?: string
}