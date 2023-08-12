import RepositoryProdutos from "../repositories/produtos.repository";
import FiltrosProdutos from "../types/FiltrosProdutos";
import { PaginationOptions } from "../types/Paginate";

export default async function listProdutos({
	nome,
	codigo,
	options,
}: FiltrosProdutos & { options: PaginationOptions }) {
	const { produtos, totalPages, totalDocuments } =
		await RepositoryProdutos.list({ nome, codigo, options });

	return { produtos, totalPages, totalDocuments };
}
