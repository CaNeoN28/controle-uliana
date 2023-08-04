import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
	codigo: {
		type: Number,
		required: true,
		unique: true
	},
	nome: {
		type: String,
		required: true
	},
	preco: {
		type: Number,
		required: true
	},
	tipo_unidade: {
		type: String,
		enum: ["un", "kg"],
		required: true
	},
})

const Produto = mongoose.model("produto", produtoSchema)

export default Produto