import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";
import styles from "./Return.module.css";

export default function Return({
	to,
	children,
}: {
	to: string;
	children: any;
}) {
	return <Link href={to} className={styles.return}>
		<AiOutlineLeft/>
		{children}
	</Link>;
}
