"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Relatorio() {
	const params = useSearchParams();

	useEffect(() => {
		console.log(params.get("dataInicial"));
		console.log(params.get("dataFinal"));
	}, []);

	return <table></table>;
}
