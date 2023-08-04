import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();

function startServer() {
	try {
		app.get("/", (_req, res) => {
			res.send("Hello");
		});

		app.listen(PORT);

		console.log(`Servidor escutando em http://localhost:${PORT}`);
	} catch (error) {
		console.log("Não foi possível iniciar o servidoor");
	}
}

startServer();
