import classNames from "classnames";
import { ComponentProps, MouseEventHandler } from "react";
import styles from "./Button.module.css";

import "../../styles/global.css"

interface Props extends ComponentProps<"button"> {
	text: string;
	secundario?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ text, onClick, secundario, ...props }: Props) {
	const classes = classNames({
		[styles.button]: true,
		[styles.primario]: !secundario,
		[styles.secundario]: secundario,
	});
	return (
		<button className={classes} onClick={onClick} {...props}>
			{text}
		</button>
	);
}
