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
					<label htmlFor="codigo">Código</label>
					<input
						id="codigo"
						type="text"
						{...register("codigo", {
							required: true,
						})}
					/>
				</div>

				<button>SALVAR</button>
			</form>
		</>
	);
}
