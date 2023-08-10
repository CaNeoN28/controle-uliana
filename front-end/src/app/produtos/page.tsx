"use client";

import FetchProdutos from "@/fetch/produtos";
import { useEffect, useState } from "react";

export default function TelaProdutos() {
	const fProdutos = new FetchProdutos();

	const getProdutos = async () => {
		const produtos = await fProdutos.getProdutos();
	};

	useEffect(() => {
		getProdutos();
	}, []);
	return (
		<>
			<div>

			</div>
		</>
	);
}
