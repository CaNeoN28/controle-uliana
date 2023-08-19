"use client";

import React, {useState} from "react";
import styles from "./vendas.module.css";
import Form from "@/components/Form";
import { Controller, useForm } from "react-hook-form";
import Venda from "@/types/Vendas";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Produto from "@/types/Produtos";
import FetchProdutos from "@/fetch/produtos";

export default function TelaVendas() {
	const { handleSubmit, control, watch, reset } = useForm<Venda>({
		defaultValues: {
			cliente: "",
		},
	});

	const fProdutos = new FetchProdutos()

	const [produtos, setProdutos] = useState<Produto[]>([])

	const cadastrarVenda = (data: Venda) => {
		console.log(data);
	};

	const findProdutos = async (produto: string) => {
		const produtos = await fProdutos.getProdutos({nome: produto})

		setProdutos(produtos.data)
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

				<div>
					<TextInput id="produtos_venda" label="Produto" onChange={(e) => {findProdutos(e.target.value)}} />

					<div>
						{produtos.length > 0 && produtos.map((produto, index) => {
							return <div key={index}>
								{produto.nome}
							</div>
						})}
					</div>
				</div>

				<Button text="Cadastrar venda" type="submit" />
			</Form>
		</main>
	);
}
