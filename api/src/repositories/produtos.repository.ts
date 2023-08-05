import Produto from "../models/Produto";

class RepositoryProdutos {
	static list = async function () {
		const produtos = await Produto.find();

		return produtos;
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

	static update = async function (data: any, id: any) {
		const produto = await RepositoryProdutos.find(id);

		await produto.updateOne(data);

		const newProduto = await Produto.findById(id)!;

		return newProduto;
	};

	static remove = async function (id: string) {
		const produto = await RepositoryProdutos.find(id)

		await produto.deleteOne();
	};
}

export default RepositoryProdutos;
