"use client";

import FetchProdutos from "@/fetch/produtos";
import { useEffect } from "react";

export default function Home() {
	const Produtos = new FetchProdutos()
	const fetch_produtos = async () => {
		const produtos = await Produtos.getProdutos();

		console.log(produtos);
	};

	useEffect(() => {
		fetch_produtos();
	}, []);

	return (
		<>
			<h2>Controle Uliana</h2>
		</>
	);
}

export async function getServerSideProps() {
	const env = process.env;
	console.log("A");
	return {
		props: {},
	};
}
