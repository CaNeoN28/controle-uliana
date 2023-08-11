export default interface Produto {
	_id: string;
	nome: string;
	codigo: string;
	tipo_unidade: "kg" | "un";
	preco: number;
}

export const isProduto = (x: any): x is Produto => true
