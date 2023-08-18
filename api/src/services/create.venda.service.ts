import VendaRepository from "../repositories/venda.repository";
import Venda from "../types/Venda";

export default async function CreateVenda(vendaData: Venda){
	const venda = await VendaRepository.createVenda(vendaData)

	return venda
}