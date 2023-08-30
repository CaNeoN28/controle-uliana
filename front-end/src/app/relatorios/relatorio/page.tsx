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

	const [dataInicial, setDataInicial] = useState("");
	const [dataFinal, setDataFinal] = useState("");

	const [relatorio, setRelatorio] = useState<Relatorio>();

	const getRelatorio = async () => {
		const relatorio = await fRelatorio
			.gerar({ dataFinal, dataInicial })
			.then((res) => res)
			.catch((err) => {
				console.log(err);
			});

		if (relatorio) setRelatorio(relatorio);
	};

	useEffect(() => {
		const dataInicial = params.get("dataInicial");
		const dataFinal = params.get("dataFinal");

		if (dataInicial) setDataInicial(dataInicial);

		if (dataFinal) setDataFinal(dataFinal);
	}, []);

	useEffect(() => {
		getRelatorio();
	}, [dataInicial]);

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
							<td>Preco médio</td>
							<td>Total</td>
						</tr>
					</thead>
					<tbody>
						{relatorio.produtos.map((produto, index) => {
							return (
								<tr>
									<td>{produto.nome}</td>
									{produto.vendas.map((venda, j) => (
										<td>
											<div className={styles.diario}>
												<div>{venda.quantidade}</div>
												<div>{numberToBRL(venda.total)}</div>
											</div>
										</td>
									))}
									<td>{produto.preco_medio}</td>
									<td>{produto.total}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</main>
	);
}
