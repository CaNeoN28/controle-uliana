"use client";

import Input from "@/components/Input";
import Return from "@/components/Return";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import styles from "./relatorios.module.css";

import "../../styles/variables.css";

export default function Relatorios() {
	const [dataInicial, setDataInicial] = useState("");
	const [dataFinal, setDataFinal] = useState("");

	useEffect(() => {
		const di = new Date(dataInicial);
		const df = new Date(dataFinal);

		if (dataInicial && dataFinal && di > df) {
			setDataFinal(dataInicial);
		}
	}, [dataInicial]);

	useEffect(() => {
		const di = new Date(dataInicial);
		const df = new Date(dataFinal);

		if (dataInicial && dataFinal && di > df) {
			setDataInicial(dataFinal);
		}
	}, [dataFinal]);

	return (
		<main>
			<Return to="/">Voltar</Return>
			<div className={styles.relatorios}>
				<div className={styles.inputs}>
					<Input
						id="data_inicial"
						type="date"
						label="Data inicial"
						value={dataInicial}
						onChange={(e) => setDataInicial(e.target.value)}
					/>
					<Input
						id="data_final"
						type="date"
						label="Data final"
						value={dataFinal}
						onChange={(e) => setDataFinal(e.target.value)}
					/>
				</div>
				<Button
					disabled={!dataInicial || !dataFinal}
					text="Relatório"
					onClick={(e) => {
						e.preventDefault();

						window.open(
							`/relatorios/relatorio?dataInicial=${dataInicial}&dataFinal=${dataFinal}`
						);
					}}
				/>
			</div>
		</main>
	);
}
