export default interface Produto {
	_id: string;
	nome: string;
	codigo: string;
	tipo_unidade: "kg" | "un";
	preco: number;
}
