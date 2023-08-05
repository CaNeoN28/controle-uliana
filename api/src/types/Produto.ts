const TIPOS_UNIDADE = ["kg", "un"];

export { TIPOS_UNIDADE };

export default interface Produto {
	nome: string;
	codigo: string;
	preco: number;
	tipo_unidade: "kg" | "un";
}
