import { ComponentProps, FormEventHandler } from "react";

interface Props extends ComponentProps<"form"> {
	onSubmit?: FormEventHandler<HTMLFormElement>;
	children: any;
}

export default function Form({ onSubmit, children, ...props }: Props) {
	return (
		<form onSubmit={onSubmit} {...props}>
			{...children}
		</form>
	);
}
