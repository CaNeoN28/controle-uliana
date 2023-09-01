"use client";

import React, { useState, useEffect } from "react";
import styles from "./vendas.module.css";
import Form from "@/components/Form";
import Venda from "@/types/Vendas";
import TextInput from "@/components/Input";
import Button from "@/components/Button";
import Produto from "@/types/Produtos";
import FetchProdutos from "@/fetch/produtos";
import "../../styles/variables.css";
import { BsFillTrashFill } from "react-icons/bs";
import { MdCancel, MdFmdBad } from "react-icons/md";
import Input from "@/components/Input";
import { numberToBRL } from "@/utils/currency";
import FetchVendas from "@/fetch/vendas";
import Link from "next/link";
import Return from "@/components/Return";

export default function TelaVendas() {
	const fProdutos = new FetchProdutos();
	const fVendas = new FetchVendas();

	const [produtosPesquisa, setProdutosPesquisa] = useState<Produto[]>([]);
	const [produtosVenda, setProdutosVenda] = useState<
		{
			produto: Produto;
			quantidade: number;
			valor: number;
			total: number;
		}[]
	>([]);

	const [erro, setErro] = useState("");

	const [produto, setProduto] = useState<Produto>();
	const [quantidade, setQuantidade] = useState<number>();
	const [search, setSearch] = useState("");

	const [cliente, setCliente] = useState("");
	const [total, setTotal] = useState(0);
	const [valorPago, setValorPago] = useState(0);

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
		setQuantidade(undefined);
		setProdutosPesquisa([]);
	};

	const adicionarProduto = () => {
		if (produto && quantidade) {
			const produtoJaAdicionado = produtosVenda.find((p) => {
				console.log(p);
				return produto.codigo == p.produto.codigo;
			});

			if (produtoJaAdicionado) {
				produtoJaAdicionado.quantidade += quantidade;
				produtoJaAdicionado.total += quantidade * produto.preco;

				produtoJaAdicionado.quantidade = Number(produtoJaAdicionado.quantidade.toFixed(3))

				getTotal();
			} else {
				setProdutosVenda([
					...produtosVenda,
					{
						produto: produto,
						quantidade: quantidade,
						valor: produto.preco,
						total: produto.preco * quantidade,
					},
				]);
			}
		}
		cancelSearch();
	};

	const cadastrarVenda = async () => {
		try {
			const response = await fVendas.createVenda({
				cliente,
				relacao_produtos: produtosVenda.map((produto) => {
					return {
						produto: produto.produto,
						quantidade: produto.quantidade,
						valor: produto.valor,
					};
				}),
				valor_pago: valorPago,
			});

			const data = response.data as Venda;

			window.open(`/vendas/${data._id}`, "_blank");

			setProdutosVenda([]);
			setCliente("");
			setTotal(0);
			setValorPago(0);
		} catch (err) {
			setErro("Não foi possível salvar a venda");
			console.log(err);
		}
	};

	const getTotal = () => {
		if (produtosVenda.length > 0) {
			const soma = produtosVenda
				.map((produto) => produto.total)
				.reduce((prev, curr) => {
					return prev + curr;
				});

			setTotal(soma);
		}
	};

	useEffect(() => {
		getTotal();
	}, [produtosVenda]);

	return (
		<main>
			<Return to={"/"}> <span>Voltar</span></Return>
			<div className={styles.vendas}>
				<Form className={styles.adicionarProdutos}>
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
										<button
											className={styles.produto}
											key={index}
											onClick={(e) => {
												e.preventDefault();
												setProduto(produto);
												setSearch(produto.nome);
												setProdutosPesquisa([]);
											}}
										>
											<span>
												({produto.codigo}) {produto.nome}
											</span>
											<span>
												{numberToBRL(produto.preco)} {produto.tipo_unidade}
											</span>
										</button>
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

					<Button
						disabled={!(produto && quantidade)}
						text="Adicionar produto"
						onClick={(e) => {
							e.preventDefault();

							if (produto && quantidade) {
								adicionarProduto();
							}
						}}
					/>
				</Form>

				<div className={styles.venda}>
					<table className={styles.produtos_venda}>
						<thead>
							<tr>
								<th>Codigo</th>
								<th>Produto</th>
								<th>Valor</th>
								<th>Quantidade</th>
								<th>Total</th>
								<th>Opcoes</th>
							</tr>
						</thead>
						<tbody>
							{produtosVenda.map((instancia, index) => {
								return (
									<tr key={index}>
										<td>{instancia.produto.codigo}</td>
										<td>{instancia.produto.nome}</td>
										<td>{numberToBRL(instancia.valor)}</td>
										<td>{instancia.quantidade}</td>
										<td>{numberToBRL(instancia.total)}</td>
										<td>
											<div className={styles.opcoes}>
												<a
													onClick={(_e) => {
														setProdutosVenda(
															produtosVenda.filter(
																(p) =>
																	p.produto.codigo != instancia.produto.codigo
															)
														);
													}}
												>
													<BsFillTrashFill />
												</a>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					{produtosVenda.length > 0 && <div>Total: {numberToBRL(total)}</div>}
				</div>

				<div className={styles.confirmar_venda}>
					<Input
						disabled={produtosVenda.length === 0}
						id="nome_cliente"
						label="Cliente:"
						value={cliente}
						onChange={(e) => setCliente(e.target.value)}
					/>

					<Input
						disabled={produtosVenda.length === 0}
						id="valor_pago"
						label="Valor pago:"
						value={valorPago}
						type="number"
						onChange={(e) => {
							setValorPago(e.target.valueAsNumber);
						}}
					/>

					<Input disabled id="total" label="Total:" value={total} />

					<Input disabled id="troco" label="Troco:" value={valorPago - total} />

					<Button
						disabled={produtosVenda.length == 0}
						text="Confirmar venda"
						onClick={(e) => {
							e.preventDefault;
							cadastrarVenda();
						}}
					/>

					{erro && erro}
				</div>
			</div>
		</main>
	);
}
