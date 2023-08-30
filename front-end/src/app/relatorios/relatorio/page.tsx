"use client";

import FetchRelatorios from "@/fetch/relatorios";
import Relatorio from "@/types/Relatorio";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./relatorio.module.css";
import { numberToBRL } from "@/utils/currency";

export default function Relatorio() {
	const params = useSearchParams();
	const fRelatorio = new FetchRelatorios();

	const [relatorio, setRelatorio] = useState<Relatorio>();

	const getRelatorio = async () => {
		let dataInicial = params.get("dataInicial");
		let dataFinal = params.get("dataFinal");

		if (dataFinal && dataInicial) {
			dataInicial = dataInicial.replaceAll("-", "/")
			dataFinal = dataFinal.replaceAll("-", "/")

			const relatorio = await fRelatorio
				.gerar({ dataFinal, dataInicial })
				.then((res) => res)
				.catch((err) => {
					console.log(err);
				});

			if (relatorio) setRelatorio(relatorio);
		}
	};

	useEffect(() => {
		getRelatorio()
	}, []);

	return (
		<main>
			{relatorio && (
				<table className={styles.relatorio}>
					<thead>
						<tr>
							<td>Produto</td>
							{relatorio.dias.map((dia, index) => {
								const fdia = new Date(dia);
								return (
									<td key={index}>
										{fdia.getDate()}/{fdia.getMonth() + 1}
									</td>
								);
							})}
							<td>Quantidade</td>
							<td>Preco médio</td>
							<td>Total</td>
						</tr>
					</thead>
					<tbody>
						{relatorio.produtos.map((produto, index) => {
							return (
								<tr key={index}>
									<td>{produto.nome}</td>
									{produto.vendas.map((venda, j) => (
										<td key={j}>
											<div className={styles.diario}>
												<div>{venda.quantidade}</div>
												<div>{numberToBRL(venda.total)}</div>
											</div>
										</td>
									))}
									<td>{produto.quantidade}</td>
									<td>{numberToBRL(produto.preco_medio)}</td>
									<td>{numberToBRL(produto.total)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</main>
	);
}
