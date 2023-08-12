import { ComponentProps, FormEventHandler } from "react";
import styles from "./Form.module.css"

interface Props extends ComponentProps<"form"> {
	onSubmit?: FormEventHandler<HTMLFormElement>;
	children: any;
}

export default function Form({ onSubmit, children, ...props }: Props) {
	return (
		<form className={styles.form} onSubmit={onSubmit} {...props}>
			{...children}
		</form>
	);
}
