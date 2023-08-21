import APIGetResponse from "@/types/APIGetResponse";
import { API_URL } from "@/variables";
import axios from "axios";

class FetchVendas{
	async findVenda (id: string){
		const venda = (await axios.get(`${API_URL}/venda/${id}`)).data

		return venda
	}
}

export default FetchVendas