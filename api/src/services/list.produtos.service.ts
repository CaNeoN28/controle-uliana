import RepositoryProdutos from "../repositories/produtos.repository";

export default async function listProdutos() {
	const produtos = await RepositoryProdutos.list();

	return produtos;
}
