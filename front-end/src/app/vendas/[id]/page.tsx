"use client";

import FetchVendas from "@/fetch/vendas";
import Venda from "@/types/Vendas";
import { useState, useEffect } from "react";

export default function Venda({ params }: { params: { id: string } }) {
	const fVendas = new FetchVendas();

	const [venda, setVenda] = useState<Venda>();
	const [error, setError] = useState();

	const getVenda = async function () {
		const venda = (await fVendas
			.findVenda(params.id)
			.then((res) => res)
			.catch((err) => {
				setError(err);
			})) as Venda;

		setVenda(venda);
	};

	useEffect(() => {
		getVenda();
	}, []);

	if (venda) return <div></div>;
	else if (error) return <>Venda não encontrada</>;
}
