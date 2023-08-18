import VendaRepository from "../repositories/venda.repository";

export default async function ListVendas() {
	const vendas = await VendaRepository.listVendas()

	return vendas
}