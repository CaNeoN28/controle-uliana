import express from "express";
import * as dotenv from "dotenv";
import dbConnect from "./dbConfig/dbConnect";
import Produto from "./src/models/Produto";
import appRouter from "./src/routes";

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json())

async function startServer() {
	try {
		app.use(appRouter)
		app.get("/", (_req, res) => {
			res.send("Hello");
		});

		await dbConnect()
		app.listen(PORT);

		console.log(`Servidor escutando em http://localhost:${PORT}`);
	} catch (error) {
		console.log(error)
		console.log("Não foi possível iniciar o servidor");
	}
}

startServer();
