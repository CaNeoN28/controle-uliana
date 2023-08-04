import Produto from "../models/Produto";

class RepositoryProdutos {
	static list = async function () {
		const produtos = await Produto.find();

		return produtos;
	};
}

export default RepositoryProdutos
