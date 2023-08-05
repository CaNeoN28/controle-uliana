import mongoose from "mongoose";

export default function FindProduto(id: string) {
	if (!mongoose.isValidObjectId(id)) throw new Error("Id inválido");

	return id
}
