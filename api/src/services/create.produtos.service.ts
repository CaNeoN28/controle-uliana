import RepositoryProdutos from "../repositories/produtos.repository"
import ValidateProduto from "../validators/Produto"

export default async function CreateProdutos(data: any) {
	ValidateProduto(data)

	const produto = RepositoryProdutos.create(data)
	return produto
}