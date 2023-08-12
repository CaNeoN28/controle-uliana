import { ComponentProps } from "react";
import { RefCallBack } from "react-hook-form";
import styles from "./TextInput.module.css";

interface Props extends ComponentProps<"input"> {
	label: string;
	id: string;
	innerref?: RefCallBack;
}

export default function TextInput({ label, id, innerref, ...props }: Props) {
	return (
		<div className={styles.group}>
			<label className={styles.label} htmlFor={id}>{label}</label>
			<input className={styles.input} type="text" id={id} ref={innerref} {...props} />
		</div>
	);
}
