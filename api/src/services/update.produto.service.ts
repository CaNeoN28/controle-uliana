import mongoose from "mongoose"
import RepositoryProdutos from "../repositories/produtos.repository"
import ValidateProduto from "../validators/Produto"

export default async function UpdateProduto(data: any, id: string) {
	if(!mongoose.isValidObjectId(id))
		throw new Error("Id inválido")

	ValidateProduto(data)

	const produto = await RepositoryProdutos.update(data, id)

	return produto
}