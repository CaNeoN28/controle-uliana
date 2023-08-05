import RepositoryProdutos from "../repositories/produtos.repository";
import FiltrosProdutos from "../types/FiltrosProdutos";

export default async function listProdutos({nome, codigo}: FiltrosProdutos) {
	const produtos = await RepositoryProdutos.list({nome, codigo});

	return produtos;
}
