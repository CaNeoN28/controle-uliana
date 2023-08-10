export default interface Produto {
	nome: string;
	codigo: string;
	tipo_unidade: "kg" | "un";
	preco: number;
}
