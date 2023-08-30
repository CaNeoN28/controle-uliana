import Relatorio from "@/types/Relatorio";
import { API_URL } from "@/variables";
import axios from "axios";

export default class FetchRelatorios {
	gerar = async function ({
		dataInicial,
		dataFinal,
	}: {
		dataInicial: string;
		dataFinal: string;
	}) {
		const relatorio = (
			await axios.get(
				`${API_URL}/relatorio?dataInicial=${dataInicial}&dataFinal=${dataFinal}`
			)
		).data as Relatorio;

		return relatorio;
	};
}
