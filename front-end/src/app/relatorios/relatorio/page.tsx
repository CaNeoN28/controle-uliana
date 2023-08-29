"use client";

import FetchRelatorios from "@/fetch/relatorios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Relatorio() {
	const params = useSearchParams();
	const fRelatorio = new FetchRelatorios();

	const [dataInicial, setDataInicial] = useState("");
	const [dataFinal, setDataFinal] = useState("");

	const [relatorio, setRelatorio] = useState();

	const getRelatorio = async () => {
		const relatorio = await fRelatorio.gerar({ dataFinal, dataInicial });

		console.log(relatorio.data)
	};

	useEffect(() => {
		const dataInicial = params.get("dataInicial");
		const dataFinal = params.get("dataFinal");

		if (dataInicial) setDataInicial(dataInicial);

		if (dataFinal) setDataFinal(dataFinal);
	}, []);

	useEffect(() => {
		getRelatorio()
	}, [dataInicial, dataFinal]);

	return <table></table>;
}
