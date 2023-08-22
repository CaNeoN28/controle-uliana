import Produto from "../models/Produto";
import FiltrosProdutos from "../types/FiltrosProdutos";
import { PaginationOptions } from "../types/Paginate";

class RepositoryProdutos {
	static list = async function ({
		nome,
		codigo,
		options,
	}: FiltrosProdutos & { options: PaginationOptions }) {
		const filtros: any = {};
		const { page, limit } = options;

		if (nome) filtros.nome = new RegExp(nome, "i");

		if (codigo) filtros.codigo = new RegExp(codigo, "i");

		const totalDocuments = await Produto.countDocuments(filtros);
		const totalPages = Math.ceil(totalDocuments / limit);

		const produtos = await Produto.find(filtros).sort({codigo: 1}).skip(limit * (page - 1)).limit(limit);

		return {
			produtos,
			totalPages,
			totalDocuments,
		};
	};

	static create = async function (data: any) {
		const produto = new Produto(data);

		await produto.validate();

		await produto.save();

		return produto;
	};

	static find = async function (id: string) {
		const produto = await Produto.findById(id);

		if (!produto) throw new Error("Produto não encontrado");

		return produto;
	};

	static findByCode = async function (codigo: string) {
		const produto = await Produto.findOne({codigo: new RegExp(codigo, 'i')})

		if(!produto) throw new Error("Produto não encontrado")

		return produto
	};

	static update = async function (data: any, id: any) {
		const produto = await RepositoryProdutos.find(id);

		await produto.updateOne(data);

		const newProduto = await Produto.findById(id)!;

		return newProduto;
	};

	static remove = async function (id: string) {
		const produto = await RepositoryProdutos.find(id);

		await produto.deleteOne();
	};
}

export default RepositoryProdutos;
