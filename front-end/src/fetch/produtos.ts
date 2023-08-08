import { API_URL } from "@/variables";
import axios from "axios";

export default class FetchProdutos {
	async getProdutos () {
		const produtos = axios.get(`${API_URL}/produtos`);

		return produtos;
	};
}
