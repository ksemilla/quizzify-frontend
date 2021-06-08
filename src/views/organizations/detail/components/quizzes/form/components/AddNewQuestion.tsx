import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

import AddNewChoice from "./AddNewChoice"
import Choice from "./Choice"
import {
	FormGroup,
	Input,
	Label,
	Button,
	Error,
	Textarea,
} from "../../../../../../../styles/form"

type QuestionValue = {
	uid?: string;
	order: number;
	question: string;
	answer: string;
	choices: {
		uid?: string;
		order: number;
		text: string;
	}[];
}

type AddNewQuestionType = {
	order: number;
	onAddQuestion: (question: QuestionValue) => void;
}



const AddNewQuestion: React.FC<AddNewQuestionType> = ({ order, onAddQuestion }) => {

	const [error, setError] = useState<string>()
	const [question, setQuestion] = useState<QuestionValue>({
		order: order,
		question: "",
		answer: "",
		choices: []
	})

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setQuestion(data=>({
			...data,
			question: e.target.value
		}))
	}

	const addChoice = (choice: {uid?: string, order: number, text: string}) => {
		setQuestion(prevState=>({
			...prevState,
			choices: [
				...prevState.choices,
				choice
			]
		}))
	}

	const onAdd = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		if (question.question) {
			onAddQuestion(question)
			setQuestion({
				order: order,
				question: "",
				answer: "",
				choices: []
			})
		}
	}

	return (
		<div style={{display: "flex", padding: "15px", background: "white", marginBottom: "5px"}}>
			<div>{order}</div>
			<div style={{flex: 1}}>
				<FormGroup>
					{/* <Label>Question</Label> */}
					<Input
						value={question.question}
						onChange={onChange}
						placeholder="Question"
					/>
				</FormGroup>

				{question.choices.map((choice, order)=><Choice order={order+1} text={choice.text}/>)}

				<AddNewChoice
					order={question.choices.length}
					addChoice={addChoice}
				/>

			<Button onClick={onAdd}>
				Add Question
			</Button>
			</div>
		</div>
	)
}

export default AddNewQuestion