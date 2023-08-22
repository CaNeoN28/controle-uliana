import mongoose from "mongoose";
import VendaRepository from "../repositories/venda.repository";

export default async function FindVenda(id: string) {
	if(!mongoose.isValidObjectId(id))
		throw("Id inválido")

	const venda = await VendaRepository.findVenda(id)

	return venda
}