"use client";

import FetchVendas from "@/fetch/vendas";
import Venda from "@/types/Vendas";
import { useState, useEffect } from "react";
import styles from "./venda.module.css";
import "../../../styles/variables.css";
import { numberToBRL } from "@/utils/currency";
import { relative } from "path";

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

	if (venda)
		return (
			<div className={styles.venda}>
				<div>
					<span>{new Date(venda.data_venda).toLocaleString()}</span>
					<span>{venda._id}</span>
				</div>
				{venda.cliente && <div>Cliente: {venda.cliente}</div>}
				<hr />
				<table>
					<thead>
						<tr>
							<th>Código</th>
							<th>Produto</th>
							<th>Valor</th>
							<th>Quantidade</th>
							<th>Unidade</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{venda.relacao_produtos.map((instancia, index) => (
							<tr>
								<td>{instancia.produto.codigo}</td>
								<td>{instancia.produto.nome}</td>
								<td>{numberToBRL(instancia.valor)}</td>
								<td>{instancia.quantidade}</td>
								<td>{instancia.produto.tipo_unidade}</td>
								<td>{numberToBRL(instancia.total)}</td>
							</tr>
						))}
					</tbody>
				</table>
				<hr />
				<div>
					<span>Total:</span>
					<span>{numberToBRL(venda.total)}</span>
				</div>
				<div>
					<span>Pago:</span>
					<span>{numberToBRL(venda.valor_pago)}</span>
				</div>
				<div>
					<span>Troco:</span>
					<span>{numberToBRL(venda.troco)}</span>
				</div>

				<hr />
				<div>
					Esse documento não possui valor fiscal
				</div>
			</div>
		);
	else if (error) return <>Venda não encontrada</>;
}
