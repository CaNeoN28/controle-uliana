"use client";

import FetchProdutos from "@/fetch/produtos";
import Produtos from "@/types/Produtos";
import { useEffect, useState } from "react";
import styles from "./produtos.module.css";
import { useForm } from "react-hook-form";

export default function TelaProdutos() {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm();
	const fProdutos = new FetchProdutos();

	const [produtos, setProdutos] = useState<Produtos[]>([]);

	const getProdutos = async () => {
		const produtos = await fProdutos.getProdutos();

		setProdutos(produtos);
	};

	useEffect(() => {
		getProdutos();
	}, []);

	return (
		<>
			<ul className={styles.produtos}>
				{produtos.map((produto) => (
					<li className={styles.produto}>
						<div className={styles.info_group}>
							<span>{produto.codigo}</span>
							<span>{produto.nome}</span>
						</div>
						<div className={styles.info_group}>
							<span>R$ {produto.preco}</span>
							<span>{produto.tipo_unidade}</span>
						</div>
					</li>
				))}
			</ul>

			<form
				onSubmit={handleSubmit((data) => {
					console.log(data);
				})}
			>
				<div>
					<label htmlFor="codigo">Código: </label>
					<input
						id="codigo"
						type="text"
						{...register("codigo", {
							required: true,
							pattern: /^[0-9]*$/
						})}
					/>
				</div>

				<div>
					<label htmlFor="nome">Nome do produto: </label>
					<input
						id="nome"
						type="text"
						{...register("nome", {
							required: true,
						})}
					/>
				</div>

				<div>
					<label htmlFor="preco">Preço: </label>
					<input
						id="preco"
						type="text"
						{...register("preco", {
							required: true,
							pattern: /^[0-9]*$/
						})}
					/>
				</div>

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
			</form>
		</>
	);
}
