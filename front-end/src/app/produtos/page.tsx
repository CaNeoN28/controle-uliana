"use client";

import FetchProdutos from "@/fetch/produtos";
import Produto from "@/types/Produtos";
import { useEffect, useState } from "react";
import styles from "./produtos.module.css";
import { useForm } from "react-hook-form";

export default function TelaProdutos() {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm<Produto>();
	const fProdutos = new FetchProdutos();

	const [produtos, setProdutos] = useState<Produto[]>([]);
	
	const [creationError, setCreationError] = useState("")

	const getProdutos = async () => {
		const produtos = await fProdutos.getProdutos();

		setProdutos(produtos);
	};

	const onSubmit = async (data: Produto) => {
		try{
			await fProdutos.saveProduto(data);

		} catch(err) {
			console.log(err)
			setCreationError("Não foi possivel salvar o produto")
		}

		getProdutos()
	};

	const onDelete = async (id: string) => {
		try {
			await fProdutos.deleteProduto(id)
		} catch(error) {
			console.log(error)
		}

		getProdutos()
	}

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
						<button onClick={(e) => {
							e.preventDefault()
							onDelete(produto._id)
						}}>EXCLUIR</button>
					</li>
				))}
			</ul>

			<form
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<label htmlFor="codigo">Código: </label>
					<input
						id="codigo"
						type="text"
						{...register("codigo", {
							required: true,
							pattern: /^[0-9]*$/,
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
							validate: (value) => {
								return !isNaN(Number(value))
							}
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

				{creationError && (
					<div>
						{creationError}
					</div>
				)}
			</form>
		</>
	);
}
