import Produto from "../models/Produto";

class RepositoryProdutos {
	static list = async function () {
		const produtos = await Produto.find();

		return produtos;
	};

	static create = async function (data: any) {
		const produto = new Produto(data)

		await produto.validate()

		await produto.save()

		return produto
	};
}

export default RepositoryProdutos;
