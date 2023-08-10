"use client";

import FetchProdutos from "@/fetch/produtos";
import { useEffect } from "react";

export default function Home() {
	return (
		<>
			<a href="/produtos">
				<button>PRODUTOS</button>
			</a>
		</>
	);
}