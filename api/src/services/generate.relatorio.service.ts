import RepositoryRelatorio from "../repositories/relatorio.repository";
import FiltrosRelatorio from "../types/FiltrosRelatorio";

export default async function GenerateRelatorio({
	data_final,
	data_inicial,
}: FiltrosRelatorio) {
	let {
		data_inicial: fDataInicial,
		data_final: fDataFinal,
	}: FiltrosRelatorio = { data_final: "", data_inicial: "" };

	if (data_inicial) {
		if (isNaN(Date.parse(data_inicial)))
			throw new Error("Data inicial inválida");

		fDataInicial = new Date(data_inicial).toString() 
	}

	if (data_final){
		if(isNaN(Date.parse(data_final)))
		throw new Error("Data final inválida");

		fDataFinal = new Date(data_final).setHours(23, 59, 59).toString()
	}

	const relatorio = await RepositoryRelatorio.getRelatorio({
		data_final: fDataFinal,
		data_inicial: fDataInicial,
	});

	return relatorio;
}
