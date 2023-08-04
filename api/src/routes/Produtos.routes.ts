import { Router } from "express";

const produtosRoutes = Router()

produtosRoutes.route("/produtos").get((_req, res) => {res.send("Produtos")})

export default produtosRoutes