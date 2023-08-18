import mongoose from "mongoose";

const VendaSchema = new mongoose.Schema({
	relacao_produtos:[{
		valor: Number,
		produto: {
			type: mongoose.Types.ObjectId,
			ref: "produto"
		},
		quantidade: Number,
		total: Number
	}],
	total: Number,
	valor_pago: Number,
	cliente: String
}, {
	timestamps: {createdAt: "data_venda", updatedAt: "data_atualizacao"}
})

const VendaModel = mongoose.model("venda", VendaSchema)

export default VendaModel