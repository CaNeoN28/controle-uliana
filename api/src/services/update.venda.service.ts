import mongoose from "mongoose";
import VendaRepository from "../repositories/venda.repository";

export default async function UpdateVenda({id, valor_pago}: {id: string, valor_pago: string}) {
	if(!mongoose.isValidObjectId(id))
		throw new Error("Id inválido")

	if(isNaN(Number(valor_pago)))
		throw new Error("Valor inválido")

	const venda = VendaRepository.updateVenda({id, valor_pago: Number(valor_pago)})

	return venda
} 