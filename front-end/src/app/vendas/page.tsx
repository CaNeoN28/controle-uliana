"use client";

import React from "react";
import styles from "./vendas.module.css";
import Form from "@/components/Form";
import { Controller, useForm } from "react-hook-form";
import Venda from "@/types/Vendas";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

export default function TelaVendas() {
	const { handleSubmit, control } = useForm<Venda>({
		defaultValues: {
			cliente: ""
		}
	});

	const cadastrarVenda = (data: Venda) => {
		console.log(data);
	};

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

				<Button text="Cadastrar venda" type="submit"/>
			</Form>
		</main>
	);
}
