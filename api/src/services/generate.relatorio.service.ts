import RepositoryRelatorio from "../repositories/relatorio.repository";
import FiltrosRelatorio from "../types/FiltrosRelatorio";

export default async function GenerateRelatorio({data_final, data_inicial}: FiltrosRelatorio){
	if(data_inicial && isNaN(Date.parse(data_inicial)))
		throw new Error("Data inicial inválida")

	if(data_final && isNaN(Date.parse(data_final)))
		throw new Error("Data final inválida")

	const relatorio = await RepositoryRelatorio.getRelatorio({data_final, data_inicial})

	return relatorio
}