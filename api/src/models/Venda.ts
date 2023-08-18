import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const VendaSchema = new mongoose.Schema({
	relacao_produtos:[{
		valor: Number,
		produto: {
			type: mongoose.Types.ObjectId,
			ref: "produto",
			autopopulate: true
		},
		quantidade: Number,
		total: Number
	}],
	total: Number,
	valor_pago: Number,
	troco: Number,
	cliente: String
}, {
	timestamps: {createdAt: "data_venda", updatedAt: "data_atualizacao"}
})

VendaSchema.plugin(mongooseAutoPopulate)

const VendaModel = mongoose.model("venda", VendaSchema)

export default VendaModel