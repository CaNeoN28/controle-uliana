"use client";

import React, { useState } from "react";
import styles from "./vendas.module.css";
import Form from "@/components/Form";
import { Controller, useForm } from "react-hook-form";
import Venda from "@/types/Vendas";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Produto from "@/types/Produtos";
import FetchProdutos from "@/fetch/produtos";
import "../../styles/global.css";
import { MdCancel } from "react-icons/md";

export default function TelaVendas() {
	const { handleSubmit, control, watch, reset, setValue } = useForm<Venda>({
		defaultValues: {
			cliente: "",
		},
	});

	const fProdutos = new FetchProdutos();

	const [produtos, setProdutos] = useState<Produto[]>([]);
	const [search, setSearch] = useState("")

	const cadastrarVenda = (data: Venda) => {
		console.log(data);
	};

	const findProdutos = async (produto: string) => {
		let response = await fProdutos.getProdutos({ nome: produto });

		if (response.data.length == 0)
			response = await fProdutos.getProdutos({ codigo: produto });

		const produtos = response.data;

		setProdutos(produtos);
	};

	const cancelSearch = () => {
		setSearch("")
		setProdutos([])
	}

	return (
		<main>
			<Form onSubmit={handleSubmit(cadastrarVenda)}>
				<Controller
					name="cliente"
					control={control}
					render={({ field }) => (
						<TextInput
							{...{ ...field, ref: undefined }}
							id="cliente_venda"
							label="Cliente: "
							innerref={field.ref}
						/>
					)}
				/>

				<div className={styles.procurarProdutos}>
					<TextInput
						id="produtos_venda"
						label="Produto"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value)
							findProdutos(e.target.value);
						}}
					/>

					<a className={styles.cancel} onClick={() => cancelSearch()}>
						<MdCancel />
					</a>

					{produtos.length > 0 && (
						<div className={styles.produtos}>
							{produtos.map((produto, index) => {
								return (
									<div className={styles.produto} key={index}>
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

				<Button text="Cadastrar venda" type="submit" />
			</Form>
		</main>
	);
}
