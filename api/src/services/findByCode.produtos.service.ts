import mongoose from "mongoose";
import RepositoryProdutos from "../repositories/produtos.repository";

export default async function FindProdutoByCode(codigo: string) {
	if (isNaN(Number(codigo))) throw new Error("Código inválido");

	const produto = await RepositoryProdutos.findByCode(codigo);

	return produto;
}
