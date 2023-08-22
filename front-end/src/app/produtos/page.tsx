"use client";

import FetchProdutos from "@/fetch/produtos";
import Produto, { isProduto } from "@/types/Produtos";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./produtos.module.css";
import { Controller, useForm } from "react-hook-form";
import TextInput from "@/components/Input";
import Form from "@/components/Form";
import Button from "@/components/Button";
import Select from "@/components/Select";

import "../../styles/global.css";

export default function TelaProdutos() {
	const {
		handleSubmit,
		register,
		reset,
		control,
		setValue,
		formState: { errors },
	} = useForm<Produto>({
		defaultValues: {
			codigo: "",
			nome: "",
			preco: 0,
			tipo_unidade: "kg",
		},
	});
	const fProdutos = new FetchProdutos();

	const options_tipo__unidade = [
		{
			text: "Quilograma",
			value: "kg",
		},
		{
			text: "Unidade",
			value: "un",
		},
	];

	const [produtos, setProdutos] = useState<Produto[]>([]);
	const [filtros, setFiltros] = useState({
		nome: "",
		codigo: "",
	});

	const [creationError, setCreationError] = useState("");

	const [idParaAlterar, setIdParaAlterar] = useState("");

	const getProdutos = async () => {
		const produtos = await fProdutos.getProdutos(filtros);

		setProdutos(produtos.data);
	};

	const onSubmit = async (data: Produto) => {
		try {
			if (idParaAlterar) {
				await fProdutos.updateProduto(idParaAlterar, data);
				setIdParaAlterar("");
			} else {
				await fProdutos.saveProduto(data);
			}
		} catch (err) {
			console.log(err);
			setCreationError("Não foi possivel salvar o produto");
		}

		reset();
		getProdutos();
	};

	const onUpdate = (id: string, data: Produto) => {
		setIdParaAlterar(id);

		setValue("nome", data.nome);
		setValue("codigo", data.codigo);
		setValue("preco", data.preco);
		setValue("tipo_unidade", data.tipo_unidade);
	};

	const onDelete = async (id: string) => {
		try {
			await fProdutos.deleteProduto(id);
		} catch (error) {
			console.log(error);
		}

		getProdutos();
	};

	useEffect(() => {
		getProdutos();
	}, [filtros]);

	return (
		<main className={styles["controle-produtos"]}>
			<div className={styles["produtos"]}>
				<div className={styles["filtros"]}>
					<h2 className={styles["titulo"]}>Filtros</h2>
					<Form>
						<TextInput
							label="Codigo: "
							id="codigo_filtro"
							value={filtros.codigo}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFiltros({ ...filtros, codigo: e.target.value })
							}
						/>
						<TextInput
							label="Nome do Produto: "
							id="nome_filtro"
							type="text"
							value={filtros.nome}
							onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
						/>
					</Form>
				</div>
				<ul className={styles["lista-produtos"]}>
					{produtos.map((produto, index) => (
						<li className={styles["produto"]} key={index}>
							<div className={styles["info"]}>
								<div className={styles["info-group"]}>
									<span>{produto.codigo}</span>
									<span>{produto.nome}</span>
								</div>
								<div className={styles["info-group"]}>
									<span>
										{new Intl.NumberFormat("pt-BR", {
											currency: "BRL",
											style: "currency",
										}).format(produto.preco)}
									</span>
									<span>{produto.tipo_unidade}</span>
								</div>
							</div>
							<div className={styles["button-group"]}>
								<Button
									text="DELETAR"
									secundario
									onClick={(e) => {
										e.preventDefault();
										onDelete(produto._id);
									}}
								/>
								<Button
									text="ATUALIZAR"
									onClick={(e) => {
										e.preventDefault();
										onUpdate(produto._id, produto);
									}}
								/>
							</div>
						</li>
					))}
				</ul>
			</div>

			<hr className={styles["line"]}/>

			<div className={styles["cadastro"]}>
				<h2 className={styles["titulo"]}>
					Cadastro
				</h2>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						render={({ field }) => {
							return (
								<TextInput
									{...{ ...field, ref: undefined }}
									id="codigo"
									label="Código: "
									innerref={field.ref}
									type="text"
								/>
							);
						}}
						name="codigo"
						control={control}
					/>

					<Controller
						render={({ field }) => {
							return (
								<TextInput
									{...{ ...field, ref: undefined }}
									id="nome"
									label="Nome do Produto: "
									innerref={field.ref}
									type="text"
								/>
							);
						}}
						name="nome"
						control={control}
					/>

					<Controller
						render={({ field }) => {
							return (
								<TextInput
									{...{ ...field, ref: undefined }}
									id="preco"
									label="Preço: "
									innerref={field.ref}
									type="number"
								/>
							);
						}}
						name="preco"
						control={control}
					/>

					<Controller
						name="tipo_unidade"
						control={control}
						render={({ field }) => {
							return (
								<Select
									{...{ ...field, ref: undefined }}
									id="tipo_unidade"
									label="Tipo de unidade: "
									options={options_tipo__unidade}
									innerref={field.ref}
								/>
							);
						}}
					/>

					<Button text="SALVAR" />

					{creationError && <div>{creationError}</div>}
				</Form>
			</div>
		</main>
	);
}
