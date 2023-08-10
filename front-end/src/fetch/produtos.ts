import Produtos from "@/types/Produtos";
import { API_URL } from "@/variables";
import axios from "axios";

export default class FetchProdutos {
	async getProdutos () {
		const produtos = (await axios.get(`${API_URL}/produtos`)).data as Produtos[];

		return produtos;
	};
}
