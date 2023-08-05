import Produto, { TIPOS_UNIDADE } from "../types/Produto";

export default function ValidateProduto(data: Produto) {
	const validationErrors = [];

	if (!data.nome) {
		validationErrors.push("O nome do produto é obrigatório");
	} else if (data.nome.length < 3) {
		validationErrors.push(
			"O nome do produto não pode ter menos que três caracteres"
		);
	}

	if (!data.codigo) {
		validationErrors.push("O código do produto é obrigatório");
	} else if (isNaN(Number(data.codigo))) {
		validationErrors.push("O código do produto precisa ser numérico");
	}

	if (!data.preco) {
		validationErrors.push("O preço do produto é obrigatório");
	} else if (isNaN(data.preco)) {
		validationErrors.push("O preço do produto deve ser um numero");
	}

	if (!data.tipo_unidade) {
		validationErrors.push("O tipo de unidade é obrigatório");
	} else if (!TIPOS_UNIDADE.includes(data.tipo_unidade)) {
		validationErrors.push("O tipó de unidade é inválido")
	}

	if(validationErrors.length > 0)
		throw new Error(validationErrors.join(";"))
}
