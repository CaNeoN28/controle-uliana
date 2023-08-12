import { ComponentProps } from "react";
import { RefCallBack } from "react-hook-form";

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
		<div>
			<label htmlFor={id}>{label}</label>
			<select id={id} ref={innerref} {...props}>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}
