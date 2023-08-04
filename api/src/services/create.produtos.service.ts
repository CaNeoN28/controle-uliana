export default async function CreateProdutos(data: any) {
	if(!data.nome)
		throw new Error("Nome é obrigatório")

	if(!data.preco)
		throw new Error("Preço é obrigatório")

	if(!data.tipo_unidade)
		throw new Error("O tipo da unidade é obrigatório")

	if(!data.codigo)
		throw new Error("O código é obrigatório")

	return data
}