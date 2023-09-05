import mongoose from "mongoose";
import VendaRepository from "../repositories/venda.repository";

export default async function DeleteVenda(id: string) {
	if (!mongoose.isValidObjectId(id)) throw new Error("Id inválido");

	await VendaRepository.deleteVenda(id);
}
