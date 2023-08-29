"use client";

import Input from "@/components/Input";
import Return from "@/components/Return";
import { useState } from "react";
import Button from "@/components/Button";
import styles from "./relatorios.module.css";

import "../../styles/variables.css";

export default function Relatorios() {
	const [dataInicial, setDataInicial] = useState("");
	const [dataFinal, setDataFinal] = useState("");

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

						console.log({
							dataInicial,
							dataFinal,
						});
					}}
				/>
			</div>
		</main>
	);
}
