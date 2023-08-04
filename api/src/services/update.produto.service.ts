import mongoose from "mongoose"
import RepositoryProdutos from "../repositories/produtos.repository"

export default async function UpdateProduto(data: any, id: string) {
	if(!mongoose.isValidObjectId(id))
		throw new Error("Id inválido")

	const produto = await RepositoryProdutos.update(data, id)

	return produto
}