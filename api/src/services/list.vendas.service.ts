import VendaRepository from "../repositories/venda.repository";
import FiltrosVenda from "../types/FiltrosVenda";

export default async function ListVendas(filtros: FiltrosVenda) {
	const vendas = await VendaRepository.listVendas(filtros)

	return vendas
}