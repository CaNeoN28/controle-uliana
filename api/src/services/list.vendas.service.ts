import VendaRepository from "../repositories/venda.repository";

export default async function ListVendas({cliente}: {cliente: string}) {
	const vendas = await VendaRepository.listVendas({cliente})

	return vendas
}