import Venda from "@/types/Vendas";
import { API_URL } from "@/variables";
import axios from "axios";

class FetchVendas {
	async findVenda(id: string) {
		const venda = (await axios.get(`${API_URL}/venda/${id}`)).data;

		return venda;
	}

	async createVenda(data: Venda) {
		const response = await axios
			.post(`${API_URL}/venda`, data)
			.then((res) => res)
			.catch((err) => {
				throw err;
			});

		return response;
	}
}

export default FetchVendas;
