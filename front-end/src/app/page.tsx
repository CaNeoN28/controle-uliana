"use client";

import Button from "@/components/Button";
import styles from "./styles.module.css"

export default function Home() {
	return (
		<div className={styles.menu}>
			<a href="/vendas">
				<Button text="VENDAS" />
			</a>
			<a href="/produtos">
				<Button text="PRODUTOS" />
			</a>
		</div>
	);
}
