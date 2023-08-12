import { ComponentProps } from "react";
import { RefCallBack } from "react-hook-form";
import styles from "./Select.module.css"

interface Props extends ComponentProps<"select"> {
	id: string;
	label: string;
	options: {
		text: string;
		value: any;
	}[];
	innerref?: RefCallBack;
}

export default function Select({
	id,
	label,
	options,
	innerref,
	...props
}: Props) {
	return (
		<div className={styles.group}>
			<label htmlFor={id}>{label}</label>
			<select className={styles.select} id={id} ref={innerref} {...props}>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}
