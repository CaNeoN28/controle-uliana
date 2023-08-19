"use client";

import React, { useState } from "react";
import styles from "./vendas.module.css";
import Form from "@/components/Form";
import { Controller, useForm } from "react-hook-form";
import Venda from "@/types/Vendas";
import TextInput from "@/components/Input";
import Button from "@/components/Button";
import Produto from "@/types/Produtos";
import FetchProdutos from "@/fetch/produtos";
import "../../styles/variables.css";
import { MdCancel } from "react-icons/md";
import Input from "@/components/Input";

export default function TelaVendas() {
	const { handleSubmit, control, watch, reset, setValue } = useForm<Venda>({
		defaultValues: {
			cliente: "",
		},
	});

	const fProdutos = new FetchProdutos();

	const [produtosPesquisa, setProdutosPesquisa] = useState<Produto[]>([]);

	const [produto, setProduto] = useState<Produto>();
	const [quantidade, setQuantidade] = useState<number>();
	const [search, setSearch] = useState("");

	const findProdutos = async (produto: string) => {
		let response = await fProdutos.getProdutos({ nome: produto });

		if (response.data.length == 0)
			response = await fProdutos.getProdutos({ codigo: produto });

		const produtos = response.data;

		setProdutosPesquisa(produtos);
	};

	const cancelSearch = () => {
		setSearch("");
		setProduto(undefined);
		setProdutosPesquisa([]);
	};

	return (
		<main>
			<Form>
				<div className={styles.procurarProdutos}>
					<TextInput
						id="produtos_venda"
						disabled={Boolean(produto)}
						label="Produto"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							findProdutos(e.target.value);
						}}
					/>

					<a className={styles.cancel} onClick={() => cancelSearch()}>
						<MdCancel />
					</a>

					{produtosPesquisa.length > 0 && (
						<div className={styles.produtos}>
							{produtosPesquisa.map((produto, index) => {
								return (
									<div
										className={styles.produto}
										key={index}
										onClick={() => {
											setProduto(produto);
											setSearch(produto.nome);
											setProdutosPesquisa([]);
										}}
									>
										<span>
											({produto.codigo}) {produto.nome}
										</span>
										<span>
											{new Intl.NumberFormat("pt-BR", {
												currency: "BRL",
												style: "currency",
											}).format(produto.preco)}{" "}
											{produto.tipo_unidade}
										</span>
									</div>
								);
							})}
						</div>
					)}
				</div>
				<div>
					<Input
						disabled={!produto}
						id="quantidade_produto"
						label="Quantidade:"
						type="number"
						value={quantidade || ""}
						onChange={(e) => {
							setQuantidade(Number(e.target.value));
						}}
					/>
				</div>
			</Form>
		</main>
	);
}
