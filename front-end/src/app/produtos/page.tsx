"use client";

import FetchProdutos from "@/fetch/produtos";
import Produtos from "@/types/Produtos";
import { useEffect, useState } from "react";

export default function TelaProdutos() {
	const fProdutos = new FetchProdutos();

	const [produtos, setProdutos] = useState<Produtos[]>([])

	const getProdutos = async () => {
		const produtos = await fProdutos.getProdutos();

		setProdutos(produtos)
	};

	useEffect(() => {
		getProdutos();
	}, []);

	return (
		<>
			<ul>
				{produtos.map((produto) => (
					<li>
						<div>
							<span>{produto.codigo}</span>
							<span>{produto.nome}</span>
						</div>
						<div>
							<span>{produto.preco}</span>
							<span>{produto.tipo_unidade}</span>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
