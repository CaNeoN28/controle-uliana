import Produto from "@/types/Produtos";
import { API_URL } from "@/variables";
import axios from "axios";

export default class FetchProdutos {
	async getProdutos(filtros: any) {
		const produtos = (await axios.get(`${API_URL}/produtos`, {
			params: filtros
		})).data as Produto[] | Produto;

		return produtos;
	}

	async saveProduto(data: Produto) {
		const response = await axios
			.post(`${API_URL}/produtos`, data)
			.then((res) => res)
			.catch((err) => {
				throw err;
			});

		return response;
	}

	async updateProduto(id: string, data: Produto) {
		const response = await axios
			.put(`${API_URL}/produto/${id}`, data)
			.then((res) => res)
			.catch((err) => {
				throw err;
			});

		return response;
	}

	async deleteProduto(id: string) {
		await axios
			.delete(`${API_URL}/produto/${id}`)
			.then(() => {})
			.catch((err) => {
				throw err;
			});
	}
}
