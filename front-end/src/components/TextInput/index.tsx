import { ComponentProps } from "react";
import { RefCallBack } from "react-hook-form";

interface Props extends ComponentProps<"input"> {
	label: string;
	id: string;
	innerref?: RefCallBack;
}

export default function TextInput({ label, id, innerref, ...props }: Props) {
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input type="text" id={id} ref={innerref} {...props} />
		</div>
	);
}
