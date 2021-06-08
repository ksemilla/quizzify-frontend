import { useState } from "react"
import {
	FormGroupInline,
	Input,
	Label,
	Button,
	Error,
	Textarea,
} from "../../../../../../../styles/form"

type ChoiceValue = {
	order: number;
	text: string;
}

type ChoiceType = {
	order: number;
	text: string;
}


const Choice: React.FC<ChoiceType> = ({ order, text }) => {

	const [choice, setChoice] = useState<ChoiceValue>({ order, text })

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setChoice(data=>({
			...data,
			text: e.target.value
		}))
	}

	return (
		<div style={{padding: "5px", borderRadius: "5px"}}>
			<FormGroupInline>
				<Label>{String.fromCharCode(order + 64)}</Label>
				<Input
					value={choice.text}
					onChange={onChange}
				/>
				<Button>
					Remove
				</Button>
			</FormGroupInline>
		</div>
	)
}

export default Choice