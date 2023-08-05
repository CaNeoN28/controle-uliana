import mongoose from "mongoose";

export default async function DeleteProduto(id: string) {
	if (!mongoose.isValidObjectId(id)) throw new Error("Id inválido");

	return id;
}
