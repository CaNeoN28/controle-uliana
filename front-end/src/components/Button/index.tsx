import { ComponentProps, MouseEventHandler } from "react";

interface Props extends ComponentProps<"button"> {
	text: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ text, onClick, ...props }: Props) {
	return (
		<button onClick={onClick} {...props}>
			{text}
		</button>
	);
}
