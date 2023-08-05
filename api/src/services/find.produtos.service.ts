import mongoose from "mongoose";
import RepositoryProdutos from "../repositories/produtos.repository";

export default async function FindProduto(id: string) {
	if (!mongoose.isValidObjectId(id)) throw new Error("Id inválido");

	const produto = await RepositoryProdutos.find(id);

	return produto;
}
