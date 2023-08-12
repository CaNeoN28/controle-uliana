"use client";

import FetchProdutos from "@/fetch/produtos";
import Produto, { isProduto } from "@/types/Produtos";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./produtos.module.css";
import { Controller, useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import Form from "@/components/Form";

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
			tipo_unidade: "kg"
		}
	});
	const fProdutos = new FetchProdutos();

	const [produtos, setProdutos] = useState<Produto[]>([]);
	const [filtros, setFiltros] = useState({
		nome: "",
		codigo: "",
	});

	const [creationError, setCreationError] = useState("");

	const [idParaAlterar, setIdParaAlterar] = useState("");

	const getProdutos = async () => {
		const produtos = await fProdutos.getProdutos(filtros);

		if (Array.isArray(produtos)) setProdutos(produtos);
		else setProdutos([produtos]);
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
		<>
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

			<ul className={styles.produtos}>
				{produtos.map((produto, index) => (
					<li className={styles.produto} key={index}>
						<div className={styles.info_group}>
							<span>{produto.codigo}</span>
							<span>{produto.nome}</span>
						</div>
						<div className={styles.info_group}>
							<span>
								{new Intl.NumberFormat("pt-BR", {
									currency: "BRL",
									style: "currency",
								}).format(produto.preco)}
							</span>
							<span>{produto.tipo_unidade}</span>
						</div>
						<div>
							<button
								onClick={(e) => {
									e.preventDefault();
									onUpdate(produto._id, produto);
								}}
							>
								ATUALIZAR
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									onDelete(produto._id);
								}}
							>
								EXCLUIR
							</button>
						</div>
					</li>
				))}
			</ul>

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
								type="text"
							/>
						);
					}}
					name="preco"
					control={control}
				/>

				<div>
					<label htmlFor="tipo_unidade">Tipo da unidade: </label>
					<select
						id="tipo_unidade"
						{...register("tipo_unidade", {
							required: true,
						})}
					>
						<option value={"kg"}>Quilograma</option>
						<option value={"un"}>Unidade</option>
					</select>
				</div>

				<button>SALVAR</button>

				{creationError && <div>{creationError}</div>}
			</Form>
		</>
	);
}
