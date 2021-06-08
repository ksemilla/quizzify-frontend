import React, { useEffect, useState } from "react"
import {
	FormGroupInline,
	Input,
	Label,
	Button,
	Error,
	Textarea,
} from "../../../../../../../styles/form"

type AddNewChoiceType = {
	order: number;
	addChoice: (choice: ChoiceValue) => void;
}

type ChoiceValue = {
	uid?: string;
	order: number;
	text: string;
}

const AddNewChoice: React.FC<AddNewChoiceType> = ({ order, addChoice }) => {

	const [choice, setChoice] = useState<ChoiceValue>({
		order: order,
		text: ""
	})

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setChoice(data=>({
			...data,
			text: e.target.value
		}))
	}

	const onAdd = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		addChoice(choice)
		setChoice({
			order: order,
			text: ""
		})
	}

	useEffect(()=>{
		console.log(order)
		setChoice(prevState=>({
			...prevState,
			order: order
		}))
	}, [order])

	return (
		<div style={{background: "rgba(151, 151, 143, 0.5)", padding: "5px", borderRadius: "5px"}}>
			<FormGroupInline>
				<Label>{String.fromCharCode(order + 65)}</Label>
				<Input
					value={choice.text}
					onChange={onChange}
					placeholder="Enter Choice Text"
				/>
				<Button
					onClick={onAdd}
				>
					Add
				</Button>
			</FormGroupInline>
		</div>
	)
}

export default AddNewChoice