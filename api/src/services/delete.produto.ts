import mongoose from "mongoose";
import RepositoryProdutos from "../repositories/produtos.repository";

export default async function DeleteProduto(id: string) {
	if (!mongoose.isValidObjectId(id)) throw new Error("Id inválido");

	await RepositoryProdutos.remove(id)
}
