import mongoose from "mongoose"

export default async function UpdateProduto(data: any, id: string) {
	if(!mongoose.isValidObjectId(id))
		throw new Error("Id inválido")
	
	const produto = {...data, id}

	return produto
}